/**
 * Motion system. GSAP + ScrollTrigger for reveals, parallax, pinned sections and
 * counters; Lenis for smooth scrolling. Everything is driven by data attributes so
 * components stay declarative:
 *
 *   data-reveal                reveal on enter (fade + rise). data-reveal="left|right|scale"
 *   data-reveal-group          stagger children that have data-reveal
 *   data-parallax="0.2"        move at 20% of scroll speed (positive = slower)
 *   data-counter="1200"        count up from 0 (data-decimals, data-prefix, data-suffix)
 *   data-split                 animate words of a heading in one by one
 *   data-tilt                  subtle 3D tilt on hover
 *   data-magnetic              button follows the cursor slightly
 *   data-hero-bg               hero background layers get scroll parallax + scale
 *   data-progress              horizontal progress bar bound to page scroll
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;

export function initSmoothScroll(enabled: boolean) {
  if (!enabled || prefersReduced() || lenis) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('lenis');

  // Anchor links scroll smoothly through Lenis
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = id ? document.getElementById(id) : document.body;
    if (!target) return;
    e.preventDefault();
    lenis!.scrollTo(target, { offset: -80 });
  });
}

export function scrollTo(target: HTMLElement | number, offset = -80) {
  if (lenis) lenis.scrollTo(target, { offset });
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function lockScroll(lock: boolean) {
  if (lenis) lock ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}

function reveals() {
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  groups.forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]'));
    items.forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 80}ms`));
  });

  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (prefersReduced()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  items.forEach((el) => {
    const kind = el.dataset.reveal;
    if (kind === 'left') gsap.set(el, { x: -40, y: 0 });
    if (kind === 'right') gsap.set(el, { x: 40, y: 0 });
    if (kind === 'scale') gsap.set(el, { scale: 0.92, y: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        el.classList.add('is-visible');
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: parseFloat(el.style.getPropertyValue('--reveal-delay') || '0') / 1000, clearProps: 'transform' });
      },
    });
  });
}

function parallax() {
  if (prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.2');
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('[data-parallax-scope]') || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-hero-bg]').forEach((el) => {
    const scope = el.closest('section') || el;
    gsap.to(el, {
      yPercent: 25,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
    });
  });
  document.querySelectorAll<HTMLElement>('[data-hero-fade]').forEach((el) => {
    const scope = el.closest('section') || el;
    gsap.to(el, {
      yPercent: 15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: scope, start: 'top top', end: '70% top', scrub: true },
    });
  });
}

function counters() {
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter || '0');
    const decimals = parseInt(el.dataset.decimals || (Number.isInteger(target) ? '0' : '1'), 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = (n: number) => prefix + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    el.textContent = fmt(0);
    if (prefersReduced()) {
      el.textContent = fmt(target);
      return;
    }
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, { v: target, duration: 1.8, ease: 'power2.out', onUpdate: () => (el.textContent = fmt(obj.v)) }),
    });
  });
}

function splitText() {
  if (prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    // Wrap each word in a span, preserving inline markup children (e.g. <span class="hl">)
    const wrapWords = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = (node.textContent || '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).classList.contains('word')) {
        Array.from(node.childNodes).forEach(wrapWords);
      }
    };
    Array.from(el.childNodes).forEach(wrapWords);
    const words = el.querySelectorAll('.word');
    gsap.set(words, { yPercent: 110, opacity: 0 });
    const play = () => gsap.to(words, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: parseFloat(el.dataset.splitDelay || '0') });
    if (el.dataset.split === 'immediate') play();
    else ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: play });
  });
}

function tilt() {
  if (prefersReduced() || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const strength = parseFloat(el.dataset.tilt || '8');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * strength, rotateX: -py * strength, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' }));
  });
}

function magnetic() {
  if (prefersReduced() || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }));
  });
}

function progress() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

function header() {
  const el = document.querySelector<HTMLElement>('[data-header]');
  if (!el) return;
  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: (self) => {
      el.classList.toggle('is-scrolled', self.scroll() > 60);
      el.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 400);
    },
  });
}

function floatLoops() {
  if (prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
    const amp = parseFloat(el.dataset.float || '12');
    gsap.to(el, { y: -amp, duration: 2.4 + (i % 3) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 });
  });
}

function horizontalScroller() {
  if (prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
    const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const distance = () => track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.kill();
    });
  });
}

export function initAnimations() {
  reveals();
  parallax();
  counters();
  splitText();
  tilt();
  magnetic();
  progress();
  header();
  floatLoops();
  horizontalScroller();
  // Fonts and images can change layout after init
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
