/* video-override.js
   Standalone video override for the demo.
   - Respects ?video=filename param when present (relative filename uses /webcam/asset/)
   - Otherwise maps parent iframe path: video1 -> etat_oblige_jeter_ordinateurs_video.mp4
                                  video2 -> ordi_obsolete_video.mp4
   - Creates a hidden muted <video>, captures its MediaStream and overrides
     navigator.mediaDevices.getUserMedia so the demo receives the MP4 stream as if it were the webcam.
*/
(function(){
  try{
    const params = new URLSearchParams(window.location.search);
    let videoParam = params.get('video');

    if(!videoParam){
      let parentPath = '';
      try{ parentPath = window.parent && window.parent.location && window.parent.location.pathname || ''; }catch(e){ parentPath = ''; }
      const seg = parentPath.split('/').filter(Boolean).pop() || '';
      switch(seg){
        case 'video1': videoParam = 'etat_oblige_jeter_ordinateurs_video.mp4'; break;
        case 'video2': videoParam = 'ordi_obsolete_video.mp4'; break;
        default: videoParam = null;
      }
    }

    if(!videoParam) return;
    const videoPath = (videoParam.indexOf('/')===-1) ? ('/webcam/asset/' + videoParam) : videoParam;
    window.__WEBCAM_VIDEO = videoPath;
    function _postParent(level, msg, meta){ try{ if(window.parent && window.parent !== window) window.parent.postMessage({source:'video-override', level:level, message:String(msg), meta:meta||null}, '*'); }catch(e){} }
    try{ console.debug('[video-override] using video:', videoPath); _postParent('debug','using video:'+videoPath); }catch(e){}

    const srcVideo = document.createElement('video');
    srcVideo.src = videoPath;
    srcVideo.muted = true;
    srcVideo.loop = true;
    srcVideo.playsInline = true;
    srcVideo.autoplay = true;
    srcVideo.style.position = 'fixed';
    srcVideo.style.left = '-9999px';
    srcVideo.style.width = '1px';
    srcVideo.style.height = '1px';
    (document.body || document.documentElement).appendChild(srcVideo);

    let resolveStream, rejectStream;
    // Provide a short timeout so we don't hang forever waiting for captureStream
    let _streamTimeout = null;
    const videoStreamPromise = new Promise((res, rej) => {
      resolveStream = function(s){ try{ if(_streamTimeout) clearTimeout(_streamTimeout); }catch(e){}; res(s); };
      rejectStream = function(err){ try{ if(_streamTimeout) clearTimeout(_streamTimeout); }catch(e){}; rej(err); };
    });
    // If capture doesn't succeed quickly, reject and allow fallback
    _streamTimeout = setTimeout(()=>{ try{ rejectStream(new Error('capture timeout')); }catch(e){} }, 3000);

    function tryCapture(){
      try{
        const fn = srcVideo.captureStream || srcVideo.mozCaptureStream;
        if(typeof fn === 'function'){
          const s = fn.call(srcVideo);
          if(s && s.getTracks && s.getTracks().length){ try{ console.debug('[video-override] captureStream provided', s.getTracks().length, 'tracks'); _postParent('debug','captureStream provided', {tracks:s.getTracks().length}); }catch(e){}; resolveStream(s); return true; }
        }
      }catch(e){}
      return false;
    }

    // Prepare native getUserMedia if present
    const nativeGet = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ? navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) : null;
    navigator.mediaDevices = navigator.mediaDevices || {};
    navigator.mediaDevices.getUserMedia = function(constraints){
      try{
        const wantsVideo = constraints && (constraints.video === true || typeof constraints.video === 'object');
        if(wantsVideo){
          return videoStreamPromise.then(s => s.clone ? s.clone() : s).catch(()=>{ if(nativeGet) return nativeGet(constraints); return Promise.reject(new Error('no getUserMedia')); });
        }
      }catch(e){}
      if(nativeGet) return nativeGet(constraints);
      return Promise.reject(new Error('no getUserMedia'));
    };

    (async function start(){
      try{ await srcVideo.play().catch(()=>{}); }catch(e){}
      if(tryCapture()) return;
      const onReady = () => { tryCapture(); };
      srcVideo.addEventListener('canplay', onReady);
      srcVideo.addEventListener('loadeddata', onReady);
      let attempts = 0;
      const MAX_ATTEMPTS = 60; // ~3s at 50ms interval
      const iv = setInterval(()=>{
        attempts++;
        if(tryCapture()){ clearInterval(iv); srcVideo.removeEventListener('canplay', onReady); srcVideo.removeEventListener('loadeddata', onReady); return; }
        if(attempts>MAX_ATTEMPTS){ clearInterval(iv); srcVideo.removeEventListener('canplay', onReady); srcVideo.removeEventListener('loadeddata', onReady); try{ console.warn('[video-override] capture failed after attempts, rejecting'); _postParent('warn','capture failed after attempts'); }catch(e){}; try{ rejectStream(new Error('capture failed')); }catch(e){} }
      },50);
      // If the video element plays but capture didn't work, log that too
      setTimeout(()=>{
        try{ if(srcVideo && !srcVideo.paused && srcVideo.currentTime>0){ console.debug('[video-override] video playing but capture unsupported'); } }catch(e){}
      }, 1000);
    })();

  }catch(e){ /* ignore errors */ }
})();
