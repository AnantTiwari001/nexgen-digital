/**
 * Ember particle field — chosen from the "Particle Playground" proposal (three
 * live concepts: Embers, Snowfall, Stardust Grid; see PLAN.md). Embers was picked
 * for the hero background: warm sparks drifting upward in brand orange and gold.
 *
 * Uses @tsparticles/slim (tree-shaken) rather than the full @tsparticles/all bundle
 * used in the proposal demo, to keep this out of the site's critical JS path.
 * Loaded lazily and idly from Hero.astro — never on the initial render path.
 */
import { tsParticles, type Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

let engineReady: Promise<void> | null = null;
function ensureEngine(): Promise<void> {
  if (!engineReady) engineReady = loadSlim(tsParticles);
  return engineReady;
}

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.innerWidth < 640;
/** Fewer particles for reduced-motion visitors and small screens. */
const scaleCount = (full: number) => (prefersReduced() ? Math.round(full * 0.15) : isNarrow() ? Math.round(full * 0.5) : full);

/** Ambient rising-ember field for the hero background. Container must already exist in the DOM. */
export async function initEmberField(id: string): Promise<Container | undefined> {
  if (!document.getElementById(id)) return undefined;
  await ensureEngine();
  const reduced = prefersReduced();
  return tsParticles.load({
    id,
    options: {
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: scaleCount(55), density: { enable: true, width: 900, height: 900 } },
        color: { value: ['#ff5a00', '#ffb454', '#ff8a4d'] },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.35, max: 1 }, animation: { enable: !reduced, speed: 0.8 } },
        size: { value: { min: 1.5, max: 4.2 } },
        shadow: { enable: true, color: '#ffb454', blur: 6 },
        move: {
          enable: !reduced,
          speed: { min: 0.5, max: 1.8 },
          direction: 'top',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: { onHover: { enable: !reduced, mode: 'repulse' } },
        modes: { repulse: { distance: 90, speed: 0.6 } },
      },
    },
  });
}
