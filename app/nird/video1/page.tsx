import React from 'react';
import Navbar from '@/components/ui/navbar';

export const metadata = {
  title: 'Video 1 - Webcam Audio Visualizer',
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
          <iframe
            src="/webcam/index.html"
            title="Webcam Audio Visualizer - Video 1"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </main>
    </>
  );
}
