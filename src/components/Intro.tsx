'use client';

import { useEffect, useRef, useState } from 'react';

const BOOT_LINES = [
  '> establishing secure channel …… [OK]',
  '> loading LAPD feed …………… [OK]',
  '> loading ADL audit 2025 ……… [OK]',
  '> loading CA DOJ · FBI ……… [OK]',
  '> plotting incidents …………',
  '> ready.',
];
const STAGES = ['Initializing monitor', 'Connecting sources', 'Plotting incidents', 'Ready'];

export default function Intro() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(STAGES[0]);
  const [boot, setBoot] = useState<string[]>([]);
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

    // boot log
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((ln, i) => {
      timers.push(setTimeout(() => setBoot((b) => [...b, ln]), 400 + i * 360));
    });

    // progress
    const start = Date.now();
    const dur = 2700;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(e * 100));
      setStage(STAGES[Math.min(STAGES.length - 1, Math.floor(e * STAGES.length))]);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 420);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      timers.forEach(clearTimeout);
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
      <div
        className="sj-intro-skip"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
      >
        Skip ⏎
      </div>
      <div className="sj-intro-logo" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-lockup.png" alt="SafeJew" />
        <div className="sweep" />
      </div>
      <div className="sj-intro-status">{stage}</div>
      <div className="sj-intro-bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="sj-intro-pct">{pct}%</div>
      <div className="sj-intro-boot">
        {boot.map((l, i) => (
          <div key={i}>
            {l.replace(' [OK]', '')}
            {l.includes('[OK]') ? <b> [OK]</b> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
