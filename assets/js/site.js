const workMenu = document.querySelector('.work-menu');
const workToggle = workMenu.querySelector('summary');
let openedByHover = false;

workMenu.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && !workMenu.open) {
    workMenu.open = true;
    openedByHover = true;
  }
});
workMenu.addEventListener('pointerleave', () => {
  if (openedByHover && !workMenu.contains(document.activeElement)) workMenu.open = false;
  openedByHover = false;
});
workToggle.addEventListener('click', event => {
  // A click on the hovered trigger pins the project list open.
  if (openedByHover && workMenu.open) event.preventDefault();
  openedByHover = false;
});
workMenu.addEventListener('focusout', event => {
  if (!workMenu.contains(event.relatedTarget)) workMenu.open = false;
});
workMenu.querySelector('.work-links').addEventListener('click', () => {
  workMenu.open = false;
});
document.addEventListener('pointerdown', event => {
  if (!workMenu.contains(event.target)) workMenu.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && workMenu.open) {
    if (workMenu.contains(document.activeElement)) workToggle.focus();
    workMenu.open = false;
    openedByHover = false;
  }
});

const loadPrototype = document.querySelector('[data-prototype]');
if (loadPrototype) {
  loadPrototype.hidden = false;
  loadPrototype.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.className = 'embed-frame';
    frame.title = 'T.AI interactive Figma prototype';
    frame.allowFullscreen = true;
    frame.src = loadPrototype.dataset.prototype;
    loadPrototype.closest('.prototype-preview').replaceWith(frame);
    frame.focus();
  }, { once: true });
}

const copyEmail = document.querySelector('#copy-email-btn');
if (copyEmail && navigator.clipboard?.writeText) {
  const address = document.querySelector('.contact-value a[href^="mailto:"]').textContent.trim();
  const status = document.querySelector('.copy-status');
  copyEmail.hidden = false;
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the address to copy it.';
    }
  });
}

const player = document.querySelector('#ost-player');
if (player) {
  const list = document.querySelector('.track-list');
  const status = document.querySelector('#track-status');
  list.hidden = false;
  list.addEventListener('click', async (event) => {
    const track = event.target.closest('button[data-src]');
    if (!track) return;

    for (const button of list.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(button === track));
    }
    const title = track.firstChild.textContent.split('·')[1].trim();
    player.setAttribute('aria-label', title);
    player.src = track.dataset.src;
    status.textContent = '';
    try {
      await player.play();
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = 'Use the audio controls to play ' + title + '.';
    }
  });
}
