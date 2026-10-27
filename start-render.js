const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4001;

console.log('==============================================');
console.log('       Rahul_Restro Production Server         ');
console.log('==============================================');
console.log(`Web public port: ${PORT}`);
console.log(`Backend internal port: ${BACKEND_PORT}`);

// Ensure standalone assets are present
try {
  require('./scripts/prepare-standalone.js');
} catch (e) {
  console.warn('Asset copy warning:', e.message);
}

// 1. Start Backend
const backendEnv = {
  ...process.env,
  PORT: String(BACKEND_PORT),
  BACKEND_PORT: String(BACKEND_PORT),
  NODE_ENV: 'production',
};

console.log('Starting NestJS Backend on port', BACKEND_PORT, '...');
const backend = spawn('node', ['apps/backend/dist/src/main.js'], {
  env: backendEnv,
  stdio: 'inherit',
});

backend.on('error', (err) => {
  console.error('Backend process error:', err);
});

backend.on('exit', (code) => {
  console.error(`Backend process exited with code ${code}`);
  process.exit(code || 1);
});

// 2. Poll Backend until it responds
function checkBackend(retries = 30) {
  if (retries <= 0) {
    console.log('Backend polling timed out. Starting Next.js web frontend anyway...');
    startWeb();
    return;
  }

  const req = http.get(`http://127.0.0.1:${BACKEND_PORT}/api/docs`, (res) => {
    console.log(`Backend responded with status ${res.statusCode}. Starting Web Frontend...`);
    startWeb();
  });

  req.on('error', () => {
    setTimeout(() => checkBackend(retries - 1), 1000);
  });
}

// 3. Start Next.js Frontend using standalone server
function startWeb() {
  console.log(`Starting Next.js Web Frontend on port ${PORT}...`);
  const webEnv = {
    ...process.env,
    PORT: String(PORT),
    NODE_ENV: 'production',
    BACKEND_URL: `http://localhost:${BACKEND_PORT}`,
  };

  const serverJs = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'apps', 'web', 'server.js');
  console.log('Server file:', serverJs);

  const web = spawn('node', [serverJs], {
    env: webEnv,
    stdio: 'inherit',
  });

  web.on('error', (err) => {
    console.error('Web process error:', err);
  });

  web.on('exit', (code) => {
    console.error(`Web process exited with code ${code}`);
    process.exit(code || 1);
  });
}

// Start backend check
setTimeout(() => checkBackend(), 1500);

process.on('SIGINT', () => {
  backend.kill();
  process.exit(0);
});
process.on('SIGTERM', () => {
  backend.kill();
  process.exit(0);
});
