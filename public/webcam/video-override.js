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
    const videoStreamPromise = new Promise((res, rej) => { resolveStream = res; rejectStream = rej; });

    function tryCapture(){
      try{
        const fn = srcVideo.captureStream || srcVideo.mozCaptureStream;
        if(typeof fn === 'function'){
          const s = fn.call(srcVideo);
          if(s && s.getTracks && s.getTracks().length){ resolveStream(s); return true; }
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
      const iv = setInterval(()=>{
        attempts++;
        if(tryCapture()){ clearInterval(iv); srcVideo.removeEventListener('canplay', onReady); srcVideo.removeEventListener('loadeddata', onReady); return; }
        if(attempts>200){ clearInterval(iv); srcVideo.removeEventListener('canplay', onReady); srcVideo.removeEventListener('loadeddata', onReady); try{ rejectStream(new Error('capture failed')); }catch(e){} }
      },50);
    })();

  }catch(e){ /* ignore errors */ }
})();
