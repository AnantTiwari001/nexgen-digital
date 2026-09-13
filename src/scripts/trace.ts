/**
 * Traced-line system — shared motion utilities for the site's one signature
 * effect: a glowing line that draws itself in, landing a spark where it stops.
 * Paired with src/styles/trace.css. See PLAN.md "Signature Moments" for the
 * design rationale and where each piece is used (hero, before/after reveal,
 * video scrub, growth chart).
 *
 * Every helper here triggers automatically (on load, or on scrolling into
 * view) — nothing requires a deliberate drag or tap to be seen.
 */

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Draws an SVG path via stroke-dashoffset over `duration` ms, then calls onDone. */
export function drawPath(path: SVGPathElement | null | undefined, duration = 1200, onDone?: () => void) {
  if (!path) return;
  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  if (reducedMotion()) {
    path.style.strokeDashoffset = '0';
    onDone?.();
    return;
  }
  path.style.transition = 'none';
  path.getBoundingClientRect(); // force reflow so the transition below actually animates
  path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(.4,0,.2,1)`;
  requestAnimationFrame(() => {
    path.style.strokeDashoffset = '0';
  });
  if (onDone) setTimeout(onDone, duration);
}

/** Bursts a handful of small glowing sparks from a positioned `.spark-wrap` element, once. */
export function spawnSparks(wrap: HTMLElement | null | undefined, count = 5) {
  if (!wrap || reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = 16 + Math.random() * 14;
    s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    s.style.animationDelay = i * 30 + 'ms';
    wrap.appendChild(s);
    requestAnimationFrame(() => s.classList.add('is-live'));
    setTimeout(() => s.remove(), 1000 + i * 30);
  }
}

/** Reveals staggered `.trace-dot` elements along a path as it draws. */
export function revealDots(dots: NodeListOf<Element> | Element[], duration: number, startDelay = 120) {
  const arr = Array.from(dots);
  arr.forEach((d, i) => setTimeout(() => d.classList.add('is-in'), startDelay + (i / arr.length) * duration));
}

/** Runs `callback` once when `el` first crosses `threshold` visibility, then disconnects. */
export function onEnterOnce(el: Element | null | undefined, callback: () => void, threshold = 0.4) {
  if (!el) return;
  if (reducedMotion()) {
    callback();
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        callback();
        obs.disconnect();
      }
    });
  }, { threshold });
  obs.observe(el);
}

/** Applies a gentle scroll-linked rotateX tilt to `el`, clamped to +/- maxDeg. Needs `perspective` on a parent. */
export function scrollTilt(el: HTMLElement | null | undefined, maxDeg = 6) {
  if (!el || reducedMotion()) return;
  let raf: number | null = null;
  const update = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const centerDelta = r.top + r.height / 2 - vh / 2;
    const tilt = Math.max(-maxDeg, Math.min(maxDeg, (centerDelta / vh) * (maxDeg * 2.3)));
    el.style.transform = `rotateX(${-tilt}deg)`;
    raf = null;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}
