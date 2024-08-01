---
title: "SyntaxError: Unexpected identifier 'Ay0'"
description: "Bunで作ったexeが実行時エラーを出力したときの解決法．"
---
## 開発環境
- Windows 10
- **Bun 1.1.21**
- puppeteer 22.12.1

## 発生した実行時エラー
　Bunを使ってexeを作っている．ポイ活の自動化のために．Bunがまだ途上にあるためか，色々な壁にぶち当たる．作成したexeを実行したら，下記エラーが発生した．
```sh
SyntaxError: Unexpected identifier 'Ay0'
```
## module.typeの変更
　`bun swc`で指定する`module.type`をcommonjsから**es6**に変更する．
```sh
bun swc xxx.ts -C module.type=es6 -o xxx.js
```