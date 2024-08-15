---
title: ラズパイ4BにBraveブラウザをインストールする。
descrption: ラズベリーパイ4B上にBraveをインストールする方法をu市
---
　ラズパイ4B上にDietpiを入れ，日々作業をしている．そんななか，chromiumブラウザを使っていると広告が面倒に思えてきたので，これはBraveブラウザ入れなければと考え，インストールした．

**環境情報**
- RPi 4 Model B (aarch64)
- DietPi v9.6.1

## インストール手順
```bash
sudo apt install curl
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install brave-browser
```

### メリット
- Youtubeのデスクトップアプリをインストールして，広告なしで動画が見れる．
### デメリット
- TVerはBraveでは見れない．工夫すると見れるみたい．