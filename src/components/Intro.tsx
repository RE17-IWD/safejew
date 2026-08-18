'use client';

import { useEffect, useRef, useState } from 'react';

export default function Intro() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

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
    return () => document.body.classList.remove('sj-lock');
  }, []);

  function finish() {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem('sj_intro_seen', '1');
    } catch {
      /* ignore */
    }
    document.body.classList.remove('sj-lock');
    setDone(true);
    setTimeout(() => setShow(false), 900);
  }

  // Enter/Escape/Space to skip; a safety timeout in case the video can't autoplay/end.
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') finish();
    };
    document.addEventListener('keydown', onKey);
    const safety = setTimeout(finish, 12000);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(safety);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      id="sj-intro"
      className={`sj-intro-video${done ? ' done' : ''}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Enter SafeJew"
    >
      <video className="sj-intro-vid" src="/hero.mp4" autoPlay muted playsInline onEnded={finish} />
      <div className="sj-intro-hint" aria-hidden="true">Click anywhere to enter</div>
      <div className="sj-intro-skip" aria-hidden="true">Skip ⏎</div>
    </div>
  );
}
