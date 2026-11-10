function requireHttpsUrl(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable ${name}.`);

  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') {
    throw new Error(`${name} debe usar HTTPS.`);
  }

  return value.replace(/\/$/, '');
}

const frontendUrl = requireHttpsUrl('FRONTEND_URL');
const backendUrl = requireHttpsUrl('BACKEND_URL');

async function expectHtml(path) {
  const response = await fetch(frontendUrl + path);
  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || !contentType.includes('text/html')) {
    throw new Error(`${path} no devolvió HTML con 200.`);
  }
  const html = await response.text();
  if (!html.includes('id="root"')) {
    throw new Error(`${path} no contiene el nodo de React.`);
  }
}

async function expectJson(path) {
  const response = await fetch(backendUrl + path);
  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error(`${path} no devolvió JSON con 200.`);
  }
  await response.json();
}

await expectHtml('/');
await expectHtml('/tasks');
await expectJson('/health');
await expectJson('/health/database');

console.log('Prueba de humo aprobada.');
