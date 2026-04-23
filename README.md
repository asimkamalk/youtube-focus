# YouTube Focus — No Distraction

A Chrome/Edge/Brave extension that removes distracting elements from YouTube **only while a video is playing**. Homepage, search results, and channel pages stay completely normal — the extension only activates on `/watch` pages.

## What it hides on video pages

- Sidebar recommendations (video expands to full width)
- Comments
- End-screen cards and suggested-video overlays
- Live chat on live streams
- Merch / product shelves
- "Ask" AI button
- Download button
- "…more" description expander
- Voice search microphone
- Notifications bell
- "Create" button in the top-right

One single **Focus mode** switch turns everything on/off at once.

## How to install (Load unpacked)

1. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select this folder (the one containing `manifest.json`).
5. Pin the extension and use the **Focus mode** switch to turn it on or off.

## How it works

- `manifest.json` — Manifest V3 config, injects the content script and CSS at `document_start` on YouTube pages.
- `styles.css` — All hiding is pure CSS (`display: none !important`). Every rule requires **both** `.yt-focus-on` (extension enabled) and `.yt-focus-watch` (user is on a `/watch` page) on the `<html>` element. Nothing is hidden unless you're actually watching a video.
- `content.js` — Reads `chrome.storage.sync` and toggles the two classes. Re-runs on SPA navigation (`yt-navigate-finish`) so it correctly adds/removes classes as you move between home → video → back to home.
- `popup.html` / `popup.js` — Single master switch UI that writes to `chrome.storage.sync`. Changes apply live via `storage.onChanged`.

## Customizing

YouTube occasionally changes its DOM. If something new appears on video pages, inspect it in DevTools and add a rule to `styles.css`:

```css
html.yt-focus-on.yt-focus-watch ytd-new-annoying-thing {
  display: none !important;
}
```

The `html.yt-focus-on.yt-focus-watch` prefix keeps it scoped to enabled + watch pages only.

---

## Author

Developed by **Asim Kamal**

- GitHub: [github.com/asimkamalk](http://github.com/asimkamalk/)
- LinkedIn: [linkedin.com/in/asimkamalk](https://www.linkedin.com/in/asimkamalk/)
