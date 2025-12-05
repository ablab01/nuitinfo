"use client";

import React, { useState, useEffect } from 'react';

export default function LazyIframe({ src, title, style }: { src: string; title?: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  const [intent, setIntent] = useState(false);

  useEffect(() => {
    // If user has intent (clicked) or prefers lazy auto-load, we can load after a short delay
    let t: any = null;
    if(intent && !loaded){
      t = setTimeout(()=> setLoaded(true), 100);
    }
    return ()=>{ if(t) clearTimeout(t); };
  }, [intent, loaded]);

  const containerStyle: React.CSSProperties = { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  if(loaded) {
    return (
      <iframe src={src} title={title || 'Embedded iframe'} style={{ width: '100%', height: '100%', border: 'none', display: 'block', ...(style||{}) }} />
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 12, color: '#333' }}>{title || 'Preview'}</div>
        <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
          <button onClick={()=>setIntent(true)} style={{ padding:'8px 14px', borderRadius:8, background:'#415a2a', color:'#fff', border:'none' }}>Play</button>
        </div>
      </div>
    </div>
  );
}
