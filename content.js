// ============================================
// YouTube Focus - Content Script
// Single master switch. Only hides things on
// /watch pages (when a video is playing).
// ============================================

const DEFAULTS = { enabled: true };

function isWatchPage() {
  return location.pathname === '/watch';
}

function apply() {
  chrome.storage.sync.get(DEFAULTS, ({ enabled }) => {
    const html = document.documentElement;
    if (!html) return;

    html.classList.toggle('yt-focus-on', !!enabled);
    html.classList.toggle('yt-focus-watch', isWatchPage());
  });
}

// Apply immediately (document_start)
apply();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', apply);
}

// React to popup toggle changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') apply();
});

// YouTube is an SPA — reapply on navigation
window.addEventListener('yt-navigate-finish', apply);
