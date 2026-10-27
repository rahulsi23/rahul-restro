const { spawn } = require('child_process');
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

// 1. Start NestJS Backend on 127.0.0.1
const backendEnv = {
  ...process.env,
  PORT: String(BACKEND_PORT),
  BACKEND_PORT: String(BACKEND_PORT),
  NODE_ENV: 'production',
};

console.log('Starting NestJS Backend on 127.0.0.1:' + BACKEND_PORT + '...');
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

// 2. Start Next.js Frontend immediately on 0.0.0.0:PORT
console.log(`Starting Next.js Web Frontend on 0.0.0.0:${PORT}...`);
const webEnv = {
  ...process.env,
  PORT: String(PORT),
  HOSTNAME: '0.0.0.0',
  NODE_ENV: 'production',
  BACKEND_URL: `http://127.0.0.1:${BACKEND_PORT}`,
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

process.on('SIGINT', () => {
  backend.kill();
  web.kill();
  process.exit(0);
});
process.on('SIGTERM', () => {
  backend.kill();
  web.kill();
  process.exit(0);
});
