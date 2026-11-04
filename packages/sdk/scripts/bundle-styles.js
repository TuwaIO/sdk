import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const distStylesDir = path.resolve(packageRoot, 'dist', 'styles');

if (!fs.existsSync(distStylesDir)) {
  fs.mkdirSync(distStylesDir, { recursive: true });
}

function resolvePackageCss(pkgName) {
  const possiblePaths = [
    path.resolve(packageRoot, 'node_modules', pkgName, 'dist', 'index.css'),
    path.resolve(packageRoot, '..', '..', 'node_modules', pkgName, 'dist', 'index.css'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  console.warn(`[bundle-styles] Warning: CSS for ${pkgName} not found at paths:`, possiblePaths);
  return null;
}

const coreCssPath = resolvePackageCss('@tuwaio/nova-core');
const txCssPath = resolvePackageCss('@tuwaio/nova-transactions');
const connectCssPath = resolvePackageCss('@tuwaio/nova-connect');

const coreCss = coreCssPath ? fs.readFileSync(coreCssPath, 'utf8') : '';
const txCss = txCssPath ? fs.readFileSync(txCssPath, 'utf8') : '';
const connectCss = connectCssPath ? fs.readFileSync(connectCssPath, 'utf8') : '';

fs.writeFileSync(path.resolve(distStylesDir, 'nova-core.css'), coreCss);
fs.writeFileSync(path.resolve(distStylesDir, 'nova-transactions.css'), txCss);
fs.writeFileSync(path.resolve(distStylesDir, 'nova-connect.css'), connectCss);

const allCss = [
  '/* TUWA Nova Core Styles */',
  coreCss,
  '/* TUWA Nova Transactions Styles */',
  txCss,
  '/* TUWA Nova Connect Styles */',
  connectCss,
].join('\n\n');

fs.writeFileSync(path.resolve(distStylesDir, 'all.css'), allCss);
console.log(' Successfully bundled CSS files into dist/styles/');
