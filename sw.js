// Minimal service worker: exists so browsers offer "Add to home screen".
// It deliberately does not cache pages, so staff and drivers always get the
// live version and never a stale copy of the tool.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  // pass everything straight through to the network
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<h1 style="font-family:sans-serif;padding:24px">No connection</h1><p style="font-family:sans-serif;padding:0 24px">Check your signal and try again.</p>',
    { headers: { 'Content-Type': 'text/html' } }
  )));
});
