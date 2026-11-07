/* A shared-element title that survives a route change.

   The clicked title is cloned onto <body> exactly where it sat. Once the new
   route has painted and a [data-flight-target] exists, the clone travels to
   that headline and dissolves as the real title takes over. No library state
   is involved, so it also works while the destination is still fetching. */

let flight = null;
let idleTimer = 0;

const prefersReduced = () => (
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

export function armTitleFlight(source, text, options = {}) {
  if (!source || !text || prefersReduced()) return;
  clearFlight();

  const rect = source.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return;
  const cs = getComputedStyle(source);

  const node = document.createElement('span');
  node.className = 'flight-title';
  node.textContent = text;
  node.setAttribute('aria-hidden', 'true');
  node.style.cssText = [
    `left:${rect.left}px`,
    `top:${rect.top}px`,
    `font-family:${cs.fontFamily}`,
    `font-size:${cs.fontSize}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `line-height:${cs.lineHeight}`,
    `letter-spacing:${cs.letterSpacing}`,
    `color:${cs.color}`
  ].join(';');

  document.body.appendChild(node);
  flight = {
    node, rect,
    size: parseFloat(cs.fontSize) || 16,
    target: options.target || '[data-flight-target]',
    landing: false
  };

  // If no navigation follows, dissolve the clone instead of leaving it stuck.
  idleTimer = window.setTimeout(() => {
    if (flight && !flight.landing) clearFlight();
  }, 1100);

  requestAnimationFrame(() => requestAnimationFrame(() => land(0)));
}

function land(attempt) {
  if (!flight) return;
  const target = document.querySelector(flight.target);

  if (!target && attempt < 50) {
    requestAnimationFrame(() => land(attempt + 1));
    return;
  }

  flight.landing = true;
  window.clearTimeout(idleTimer);

  const { node, rect, size } = flight;
  const to = target ? target.getBoundingClientRect() : null;
  const cs = target ? getComputedStyle(target) : null;
  const targetSize = cs ? parseFloat(cs.fontSize) || size : size * 1.5;
  const scale = Math.min(3, Math.max(0.75, targetSize / size));
  const dx = (to ? to.left : rect.left) - rect.left;
  const dy = (to ? to.top : rect.top - 60) - rect.top;

  const anim = node.animate(
    [
      { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1, filter: 'blur(0px)', offset: 0 },
      { transform: `translate3d(${dx * 0.72}px, ${dy * 0.72}px, 0) scale(${1 + (scale - 1) * 0.7})`, opacity: 0.7, filter: 'blur(2px)', offset: 0.55 },
      { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`, opacity: 0, filter: 'blur(4px)', offset: 1 }
    ],
    { duration: 520, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' }
  );

  const done = () => {
    if (flight) {
      flight.node.remove();
      flight = null;
    }
  };
  anim.onfinish = done;
  anim.oncancel = done;
}

function clearFlight() {
  window.clearTimeout(idleTimer);
  if (flight && flight.node) flight.node.remove();
  flight = null;
}
