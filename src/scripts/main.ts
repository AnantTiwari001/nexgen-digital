/** Client entry loaded on every page. */
import { initTheme } from './theme';
import { initI18n } from './i18n';
import { captureAttribution } from './utm';
import { initAnimations, initSmoothScroll } from './animations';

const smooth = document.body.dataset.smooth !== 'false';

initTheme();
initI18n();
captureAttribution();
initSmoothScroll(smooth);
initAnimations();
