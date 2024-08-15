---
title: "ModuleNotFoundError: No module named 'blinker._saferef'"
description: selenium-wireと依存関係があるblinkerでエラーが発生した．対応方法を記す．
---
　　自作の楽天ポイ活ツールを作っている．pythonのバージョンを上げて，開発環境を新たに作っていた．selenium-wireをインストール後，試しにpythonでツールを動かしてみたら，以下のようなエラーが出た．
```bash
ModuleNotFoundError: No module named 'blinker._saferef'
```

　selenium-wireと依存関係にあるモジュールのようだ．[blinker](https://github.com/pallets-eco/blinker/releases)を見に行くと5日前にバージョンを上げていた．しかし，最終的な原因は1.8系から_saferef.pyが消えていたことだ．

## 対処方法
　1.8.xから1.7.0にダウングレードする．
```bash
pip install blinker==1.7.0
```