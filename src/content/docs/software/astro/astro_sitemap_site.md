---
title: "[WARN] [@astrojs/sitemap] The Sitemap integration requires the ..."
description: Astroプロジェクトでサイトマップを自動生成する方法を解説します。astro.config.mjsにsiteオプションを追加することで、ビルド時にsitemap-index.xmlが生成されます。
---

```sh
[WARN] [@astrojs/sitemap] The Sitemap integration requires the `site` astro.config option. Skipping.
```

　この警告は，cloudflare pages上でAstroをビルドしたときのログに出力されたもの．`astro.config.mjs`に`site`オプションがないため，サイトマップが作れず，スキップしたようだ．

**参考サイト**
- [公式ドキュメント - サイトマップを有効化する](https://starlight.astro.build/ja/guides/customization/)

**当時の環境**
- node : v20.15.1
- astro: 4.13.1
- @astrojs/starlight: 0.25.4

## astro.configにsiteを追加する．
　警告文のとおり，`astro.config.mjs`に以下のように`site`を追加すればよい．追加するURLは自分のWebサイトのものを．
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://xxx.example.com',
  integrations: [...],
  ...
```
　すると数学の主張でいえば，[sitemap-index.xml](https://mathdoc.ifdef.jp/sitemap-index.xml)が作成される．

## ライブラリの追加は不要．
　検索すると，@astrojs/sitemapをインストールする記事が出てくるが，すでに入っているので，やらなくてよい．`site`だけ追加すれば，ビルド時に生成してくれる．