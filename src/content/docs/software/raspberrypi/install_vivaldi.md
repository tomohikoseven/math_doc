---
title: ブラウザのvivaldiをラズパイ上にインストールする方法．
description: Raspberry Pi 4 Model BのDietPi環境で、Vivaldiブラウザをインストールする手順を解説します。ChromiumとWaylandの相性問題を回避し、快適なブラウジング環境を構築しましょう。
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
