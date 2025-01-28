---
title : webpファイルをラズパイ上で見る方法
description : Raspberry Pi 4 Model BのDietPi環境で、WebP形式の画像ファイルを表示する方法を解説します。vwebpツールのインストール手順と、コマンドラインからの画像表示方法を詳しく紹介します。
---
　webpファイルを見るためには，[vwebp](https://developers.google.com/speed/webp/download?hl=ja)が必要である．ラズパイ上にはインストールされていないので，インストールする必要がある．

## インストール環境
- RPi 4 Model B (aarch64)
- DietPi v9.6.1

## インストール
```bash
sudo apt install webp
```

## 使い方
　拡張子webpとvwebpは関連付けされていないので，ダブルクリックしてもファイル(画像)は表示されない．下記コマンドを実行すればファイルは表示される．
```bash
vwebp file_name.webp
```
