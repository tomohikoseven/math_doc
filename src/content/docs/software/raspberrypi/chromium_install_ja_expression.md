---
title: DietPiのChromiumブラウザを日本語表記にする．
description: Raspberry Pi 4 Model B上のDietPi環境で、Chromiumブラウザを日本語表示に設定する方法を解説します。設定から言語を日本語に指定しても反映されない場合の対処法として、必要なパッケージのインストール手順を紹介します。
---
　DietPi（on ラズパイ4B）をメインPCとして日々ネットサーフィンをしている．Chromiumブラウザがすぐに使えたので，日々作業しているが，settingsからlanguagesを日本語（Japanese）を指定しても日本語表記にならなかったので，調べた結果，以下をインストール（コマンド実行）すればできた．

**環境情報**
- RPi 4 Model B (aarch64)
- DietPi v9.6.1

```bash
sudo apt install chromium-browser-l10n
```