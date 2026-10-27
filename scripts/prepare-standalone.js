const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const standaloneWeb = path.join(repoRoot, 'apps', 'web', '.next', 'standalone', 'apps', 'web');
const publicSrc = path.join(repoRoot, 'apps', 'web', 'public');
const staticSrc = path.join(repoRoot, 'apps', 'web', '.next', 'static');

console.log('Copying static and public assets to Next.js standalone...');

if (fs.existsSync(publicSrc)) {
  const publicDest = path.join(standaloneWeb, 'public');
  fs.mkdirSync(publicDest, { recursive: true });
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('Copied public ->', publicDest);
}

if (fs.existsSync(staticSrc)) {
  const staticDest = path.join(standaloneWeb, '.next', 'static');
  fs.mkdirSync(staticDest, { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('Copied .next/static ->', staticDest);
}

console.log('Standalone assets preparation complete.');
