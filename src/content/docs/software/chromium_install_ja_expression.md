---
title: DietPiのChromiumブラウザを日本語表記にする．
description: DietPiに標準インストールされているChromiumを日本語表記対応にする方法を記す．
---
　DietPi（on ラズパイ4B）をメインPCとして日々ネットサーフィンをしている．Chromiumブラウザがすぐに使えたので，日々作業しているが，settingsからlanguagesを日本語（Japanese）を指定しても日本語表記にならなかったので，調べた結果，以下をインストール（コマンド実行）すればできた．

**環境情報**
- RPi 4 Model B (aarch64)
- DietPi v9.6.1

```bash
sudo apt install chromium-browser-l10n
```