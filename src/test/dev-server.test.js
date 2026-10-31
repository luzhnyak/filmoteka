// @vitest-environment node
import { createServer } from 'vite';
import { afterAll, beforeAll, expect, it } from 'vitest';

let server;
let origin;

beforeAll(async () => {
  server = await createServer({
    server: { host: '127.0.0.1', port: 0, open: false },
    optimizeDeps: { noDiscovery: true, entries: [] },
  });
  await server.listen();
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
});

afterAll(async () => {
  await server?.close();
});

it('serves a JSON manifest at the link rendered on the movies deep link', async () => {
  const page = await fetch(`${origin}/filmoteka/movies`);
  expect(page.status).toBe(200);
  const html = await page.text();
  const manifestPath = html.match(/rel="manifest" href="([^"]+)"/)[1];
  const response = await fetch(new URL(manifestPath, page.url));
  expect(response.headers.get('content-type')).toContain('application/json');
  expect(await response.json()).toHaveProperty('start_url');
  expect(manifestPath).toBe('/filmoteka/manifest.json');
  for (const [, iconPath] of html.matchAll(/rel="(?:icon|apple-touch-icon)" href="([^"]+)"/g)) {
    const icon = await fetch(new URL(iconPath, page.url));
    expect(icon.headers.get('content-type')).toContain('image/svg+xml');
  }
});
