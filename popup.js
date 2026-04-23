// ============================================
// YouTube Focus - Popup logic
// Single master switch.
// ============================================

const DEFAULTS = { enabled: true };

document.addEventListener('DOMContentLoaded', () => {
  const master = document.getElementById('master');
  const status = document.getElementById('status');

  function updateStatus(enabled) {
    status.textContent = enabled
      ? 'On — active during videos'
      : 'Off — YouTube is normal';
  }

  chrome.storage.sync.get(DEFAULTS, ({ enabled }) => {
    master.checked = !!enabled;
    updateStatus(master.checked);
  });

  master.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: master.checked });
    updateStatus(master.checked);
  });
});
