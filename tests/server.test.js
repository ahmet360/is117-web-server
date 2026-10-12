const app = require('../index');

let server;
let baseUrl;

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    server = app.listen(0, '127.0.0.1');
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  if (server && server.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  }
});

test('GET / returns the home page with status 200', async () => {
  const response = await fetch(`${baseUrl}/`);
  expect(response.status).toBe(200);
  expect(await response.text()).toBe('Hello, IS117! Your web server is working.');
});

test('GET /about returns the about page with status 200', async () => {
  const response = await fetch(`${baseUrl}/about`);
  expect(response.status).toBe(200);
  expect(await response.text()).toBe('A web server receives a request and sends a response.');
});

test('GET /missing-page returns a 404 message', async () => {
  const response = await fetch(`${baseUrl}/missing-page`);
  expect(response.status).toBe(404);
  expect(await response.text()).toBe('Page not found.');
});
