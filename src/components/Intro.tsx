'use client';

import { useEffect, useRef, useState } from 'react';

export default function Intro() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('sj_intro_seen') === '1';
    } catch {
      seen = false;
    }
    if (reduce || seen) return;

    setShow(true);
    document.body.classList.add('sj-lock');

    const start = Date.now();
    const dur = 4800;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setTimeout(finish, 380);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.classList.remove('sj-lock');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    try {
      sessionStorage.setItem('sj_intro_seen', '1');
    } catch {
      /* ignore */
    }
    document.body.classList.remove('sj-lock');
    setDone(true);
    setTimeout(() => setShow(false), 860);
  }

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') finish();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show]);

  if (!show) return null;

  return (
    <div id="sj-intro" className={done ? 'done' : ''} onClick={finish}>
      <div className="grid" />
      <div className="sj-intro-skip" onClick={(e) => { e.stopPropagation(); finish(); }}>
        Skip ⏎
      </div>
      <div className="sj-intro-logo" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-lockup.png" alt="SafeJew" />
        <div className="sweep" />
      </div>
      <div className="sj-intro-status">Jewish community safety</div>
      <div className="sj-intro-bar">
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
