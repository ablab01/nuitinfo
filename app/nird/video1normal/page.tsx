import React from 'react';
import Navbar from '@/components/ui/navbar';
import VideoSyncClient from '../../components/VideoSyncClient';

export const metadata = {
  title: 'Video 1 (Normal)',
};

export default function Page(){
  return (
    <>
      <Navbar />
      <main className="flex justify-center">
        <div
          className="w-full"
          style={{
            maxWidth: '1280px',
            margin: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: '12px',
            overflow: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            padding: '1rem'
          }}
        >

          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <VideoSyncClient videoSrc="/webcam/asset/etat_oblige_jeter_ordinateurs_video.mp4" audioSrc="/webcam/asset/etat_oblige_jeter_ordinateurs_audio.webm" />

          </div>
        </div>
      </main>
    </>
  );
}
