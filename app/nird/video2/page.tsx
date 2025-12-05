import React from 'react';
import Navbar from '@/components/ui/navbar';
import LazyIframe from '../LazyIframe';

export const metadata = {
  title: 'Video 2 - Webcam Audio Visualizer',
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center">
        <div
          className="w-full"
          style={{
            maxWidth: '1280px',
            margin: '1.5rem',
            height: 'calc(100vh - 4rem - 3rem)',
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          <LazyIframe src="/webcam/index.html" title="Cliquez pour lancer la vidéo" />
        </div>
      </main>
    </>
  );
}
