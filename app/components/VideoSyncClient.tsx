"use client";

import React, { useEffect, useRef } from 'react';

type Props = {
  videoSrc: string;
  audioSrc: string;
};

export default function VideoSyncClient({ videoSrc, audioSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    const a = audioRef.current;
    if(!v || !a) return;

    a.preload = 'auto';

    const syncTime = () => {
      try{
        if(Math.abs(v.currentTime - a.currentTime) > 0.3) a.currentTime = v.currentTime;
      }catch(e){}
    };

    const onPlay = () => { a.play().catch(()=>{}); };
    const onPause = () => { a.pause(); };
    const onSeeking = () => { try{ a.currentTime = v.currentTime; }catch(e){} };
    const onRate = () => { try{ a.playbackRate = v.playbackRate; }catch(e){} };
    const onVolume = () => { try{ a.muted = v.muted; a.volume = v.volume; }catch(e){} };
    const timeInterval = setInterval(syncTime, 250);

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('seeking', onSeeking);
    v.addEventListener('ratechange', onRate);
    v.addEventListener('volumechange', onVolume);

    const onAudioLoaded = () => { try{ a.currentTime = v.currentTime; }catch(e){} };
    a.addEventListener('loadedmetadata', onAudioLoaded);

    return () => {
      clearInterval(timeInterval);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('seeking', onSeeking);
      v.removeEventListener('ratechange', onRate);
      v.removeEventListener('volumechange', onVolume);
      a.removeEventListener('loadedmetadata', onAudioLoaded);
    };
  }, [videoSrc, audioSrc]);

  return (
    <>
      <video
        ref={videoRef}
        controls
        playsInline
        style={{width: '100%', maxHeight: '70vh', backgroundColor: '#000'}}
      >
        <source src={videoSrc} type="video/mp4" />
        <p>Your browser does not support the video element.</p>
      </video>

      <audio ref={audioRef} style={{display: 'none'}}>
        <source src={audioSrc} type="audio/webm" />
      </audio>
    </>
  );
}
