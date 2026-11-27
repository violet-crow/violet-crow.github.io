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
