---
title: Puppeteerでchromeをモバイル対応で起動する．
description: Puppeteerを使用して、Chromeブラウザをモバイル版として起動する方法を解説します。UserAgentの設定やデバイス情報の指定方法を詳しく紹介します。
---
　Puppeteerでポイ活自動実行プログラムを作っている．Chromeブラウザがモバイル版（スマートフォンから起動）でないと，表示されないボタンを押す必要があったが，Puppeteerがデフォルトで起動するChromeはモバイル版ではないため，どうにか対応したいと思っていた．

 　UserAgentをいじればどうにかなるかと考えて試したが，駄目だった．UserAgentDataのmobileをtrueにしないと駄目だった．

 ## モバイル版でChromeを起動するオプション
  UserAgentDataを与えてやればよく，重要なのは`mobile: true`.
```js {7,7}
 const browser = await puppeteer.launch({headless:false});
 const page = await browser.newPage();
 // UserAgentは適当なものを．
 const UA = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36';
 await page.setUserAgent(UA,{
    architecture: '',
    mobile: true,
    model: 'A202ZT',
    platform: 'Android',
    platformVersion: '13.0.0',
 });
```

**環境情報**
- puppeteer@22.12.1