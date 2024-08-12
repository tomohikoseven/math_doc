---
title: ブラウザのvivaldiをラズパイ上にインストールする方法．
description: ブラウザのvivaldiをラズパイ上にインストールする方法．
---
　ラズパイとChromiumは相性が良くない．WaylandとChromiumが良くないようだ．
「ティッシュ」と入力したくても，「hてぃっｓう」みたいに途中の入力(h)が先頭に来て誤変換してしまう．

　Firefoxではこのようなことは起こらないが，動作が遅いのが難点．そこで[Vivaldi](https://vivaldi.com/ja/)を試すと誤変換もなさそうで，動作もそこそこ．TVerを見ることができないが，一旦Vivaldiでブラウジングする．

## 環境
- RPi 4 Model B (aarch64)
- OS : DietPi v9.6.1

## vivaldiのインストール
```bash
sudo apt install vivaldi-stable
```
