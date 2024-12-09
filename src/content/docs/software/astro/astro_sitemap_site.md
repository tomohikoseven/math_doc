---
title: "[WARN] [@astrojs/sitemap] The Sitemap integration requires the `site` astro.config option. Skipping."
description: Astroでのサイトマップ作成時に必要な設定．
---

　タイトルにある警告は，cloudflare pages上でビルドしたときのログに出力されたもの．

**参考サイト**
- [公式ドキュメント - サイトマップを有効化する](https://starlight.astro.build/ja/guides/customization/)

**環境**
- node : v20.15.1
- astro: 4.13.1
- @astrojs/starlight: 0.25.4

## astro.configにsiteを追加する．
　警告文のとおり，`astro.config.mjs`に以下のように`site`を追加すればよい．
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://xxx.example.com',
  integrations: [...],
  ...
```
　すると，[sitemap-index.xml](https://st953225.static.jp/sitemap-index.xml)が作成される．

## ライブラリの追加は不要．
　検索すると，@astrojs/sitemapをインストールする記事が出てくるが，すでに入っているので，やらなくてよい．`site`だけ追加すれば，ビルド時に生成してくれる．