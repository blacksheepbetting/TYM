document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.add('moving');
    window.setTimeout(() => document.body.classList.remove('moving'), 500);
  });
});

const ticker = document.querySelector('.ticker');
const tickerTrack = ticker?.querySelector('.ticker-track');
const tickerGroup = ticker?.querySelector('.ticker-group');

if (ticker && tickerTrack && tickerGroup && 'requestAnimationFrame' in window) {
  document.body.classList.add('js-ticker');

  let offset = 0;
  let groupWidth = 0;
  let previousTime;

  const measureTicker = () => {
    groupWidth = tickerGroup.getBoundingClientRect().width;
    offset %= groupWidth || 1;
  };

  const moveTicker = (time) => {
    if (previousTime === undefined) previousTime = time;
    const elapsed = Math.min(time - previousTime, 80);
    previousTime = time;

    if (groupWidth) {
      const pixelsPerSecond = window.matchMedia('(max-width: 800px)').matches ? 32 : 46;
      offset = (offset + (elapsed / 1000) * pixelsPerSecond) % groupWidth;
      tickerTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    window.requestAnimationFrame(moveTicker);
  };

  measureTicker();
  if ('ResizeObserver' in window) new ResizeObserver(measureTicker).observe(tickerGroup);
  window.addEventListener('resize', measureTicker, { passive: true });
  window.requestAnimationFrame(moveTicker);
}
