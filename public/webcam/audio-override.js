/* audio-override.js
   Sets window.__WEBCAM_AUDIO based on ?track= or parent path (video1/video2),
   then patches THREE.AudioLoader.prototype.load to replace the requested URL
   with the chosen audio when THREE becomes available.
*/
(function(){
  try{
    const params = new URLSearchParams(window.location.search);
    let audio = null;
    const param = params.get('track');
    if(param){
      audio = param.indexOf('/') === -1 ? ('asset/' + param) : param;
    } else {
      let parentPath = '';
      try{ parentPath = window.parent && window.parent.location && window.parent.location.pathname || ''; }catch(e){ parentPath = ''; }
      const seg = parentPath.split('/').filter(Boolean).pop() || '';
      switch(seg){
        case 'video1': audio = 'asset/etat_oblige_jeter_ordinateurs_audio.webm'; break;
        case 'video2': audio = 'asset/ordi_obsolete_audio.webm'; break;
        default: audio = null;
      }
    }
    if(!audio) audio = 'asset/232941_New.MP3';
    window.__WEBCAM_AUDIO = audio;
  }catch(e){ window.__WEBCAM_AUDIO = 'asset/232941_New.MP3'; }

  function _postParent(level, msg, meta){ try{ if(window.parent && window.parent !== window) window.parent.postMessage({source:'audio-override', level:level, message:String(msg), meta:meta||null}, '*'); }catch(e){} }
  // Intercept XHR.open to transparently rewrite audio asset URLs to selected audio
  (function(){
    const ORIGINAL_XHR_OPEN = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      try {
        const u = String(url || '');
        // if the bundle requests the known default audio, replace with chosen audio
        if(u.indexOf('232941_New.MP3') !== -1 || u.indexOf('872056_Above-the-clouds.mp3') !== -1) {
          const replacement = window.__WEBCAM_AUDIO || u;
          arguments[1] = replacement;
          url = replacement;
          try{ _postParent('debug','rewrote XHR audio URL to '+replacement); }catch(e){}
        }
      } catch (e) {}
      return ORIGINAL_XHR_OPEN.apply(this, arguments);
    };

    // Also patch fetch to rewrite audio urls
    if(window.fetch){
      const origFetch = window.fetch;
      window.fetch = function(input, init){
        try{
          let req = input;
          if(typeof input === 'string'){
            if(input.indexOf('asset/etat_oblige_jeter_ordinateurs_audio.webm') !== -1 || input.indexOf('asset/ordi_obsolete_audio.webm') !== -1){
              req = window.__WEBCAM_AUDIO || input;
            }
          } else if(input && input.url){
            if(input.url.indexOf('asset/etat_oblige_jeter_ordinateurs_audio.webm') !== -1 || input.url.indexOf('asset/ordi_obsolete_audio.webm') !== -1){
              req = (new Request(window.__WEBCAM_AUDIO || input.url, input));
            }
          }
          try{ _postParent('debug','fetch rewrite', {input: (typeof input==='string'?input:input && input.url)}); }catch(e){}
          return origFetch.call(this, req, init);
        }catch(e){
          return origFetch.call(this, input, init);
        }
      };
    }

    // Also attempt to patch THREE.AudioLoader when available as a best-effort fallback
    let attempts = 0;
    const maxAttempts = 60; // shorten to ~3s
    const interval = setInterval(function(){
      attempts++;
      if(window.THREE && window.THREE.AudioLoader && window.THREE.AudioLoader.prototype && !window.__WEBCAM_AUDIO_PATCHED){
        try{ console.debug('[audio-override] patching THREE.AudioLoader'); _postParent('debug','patching THREE.AudioLoader'); }catch(e){}
        const orig = window.THREE.AudioLoader.prototype.load;
        window.THREE.AudioLoader.prototype.load = function(url, onLoad, onProgress, onError){
          try{
            const use = window.__WEBCAM_AUDIO || url;
            return orig.call(this, use, onLoad, onProgress, onError);
          }catch(e){
            return orig.call(this, url, onLoad, onProgress, onError);
          }
        };
        window.__WEBCAM_AUDIO_PATCHED = true;
        clearInterval(interval);
      }
      if(attempts>maxAttempts){ try{ console.warn('[audio-override] giving up patching THREE.AudioLoader'); _postParent('warn','giving up patching THREE.AudioLoader'); }catch(e){}; clearInterval(interval); }
    },50);
  })();
})();
