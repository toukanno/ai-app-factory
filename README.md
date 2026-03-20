# AI App Factory

AIと一緒にアプリを量産するためのモノレポです。  
「Chrome Extensions」「Electron Apps」「Web Tools」の3カテゴリを一気に着手できるよう、各アプリの最小構成を作成しています。

## Structure

```text
chrome-extensions/
  css-inspector/
  margin-padding-viewer/
  font-size-viewer/
  color-picker/

electron-apps/
  markdown-editor/
  shortcut-launcher/
  image-compressor/
  json-formatter/

web-tools/
  regex-tester/
  json-viewer/
  base64-encoder/
```

## Included app stubs

### Chrome Extensions
- CSS Inspector
- Margin Padding Viewer
- Font Size Viewer
- Color Picker

各ディレクトリに `manifest.json` / `popup.html` / `popup.css` / `popup.js` を配置。

### Electron Apps
- Markdown Editor
- Shortcut Launcher
- Image Compressor
- JSON Formatter

各ディレクトリに `package.json` / `main.js` / `index.html` を配置。

### Web Tools
- Regex Tester
- JSON Viewer
- Base64 Encoder

各ディレクトリに `index.html` / `style.css` / `app.js` を配置し、最小動作を実装。

## Quick check

```bash
npm run check
```

上記で、全アプリの必須ファイルが揃っているかを確認できます。
