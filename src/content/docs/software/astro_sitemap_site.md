---
title: "[WARN] [@astrojs/sitemap] The Sitemap integration requires the `site` astro.config option. Skipping."
description: Astroでのサイトマップ作成時に忘れがちな設定．
---

　Astroを使ってサイトマップを作成し，インデックス登録しようとした．[参考](https://frontworks.dev/articles/astro-sitemap/)より，手順を進めてCloudflare上にsitemap-index.xmlが作成されているか確認したら，無さそうだった．ビルドログを確認したところ下記警告が出力されていた．
 ```sh
 [WARN] [@astrojs/sitemap] The Sitemap integration requires the `site` astro.config option. Skipping.
 ```
 `site`がないからスキップしたようだ．

## astro.configにsiteを追加する．
　警告文のとおり，`astro.config.mjs`に以下のように`site`を追加すればよい．
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://xxx.example.com',
  integrations: [...],
  ...
```
　すると，[sitemap-index.xml](https://math-doc.pages.dev/sitemap-index.xml)が作成される．
