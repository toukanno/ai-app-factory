const fs = require('fs');
const paths = [
  'chrome-extensions/css-inspector/manifest.json',
  'chrome-extensions/margin-padding-viewer/manifest.json',
  'chrome-extensions/font-size-viewer/manifest.json',
  'chrome-extensions/color-picker/manifest.json',
  'electron-apps/markdown-editor/package.json',
  'electron-apps/shortcut-launcher/package.json',
  'electron-apps/image-compressor/package.json',
  'electron-apps/json-formatter/package.json',
  'web-tools/regex-tester/index.html',
  'web-tools/json-viewer/index.html',
  'web-tools/base64-encoder/index.html'
];
const missing = paths.filter((p) => !fs.existsSync(p));
if (missing.length) {
  console.error('Missing scaffold files:\n' + missing.join('\n'));
  process.exit(1);
}
console.log('Scaffold check passed. All app stubs exist.');
