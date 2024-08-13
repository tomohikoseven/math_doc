---
title: "Warning: 'ozone-platform-hint' is not in the list of known options, but still passed to Electron/Chromium."
description: VSCodeにおいて，オプション--ozone-platform-hintを付けたら，警告が出て，オプションが無視された．
---

　ラズパイ(Wayland)とChromium系のアプリは相性が悪い．

　調べていくと，オプションを付けて起動するとよいことがわかった．色々サイトを見ると，`--ozone-platform-hint=wayland`を指定すればよいことが判明．
指定してコマンドを実行すると，タイトルのとおりの警告が出て，VSCodeが起動する．オプションに`ozone-platform-hint`などないと警告．
```bash
code . --ozone-platform-hint=wayland
```
　ではどうすればいいのか調査を進めると，[環境変数に指定](https://wiki.archlinux.jp/index.php/Wayland#Electron)してやればよいとわかる．
コマンドラインで環境変数を設定(`export ELECTRON_OZONE_PLATFORM_HINT=wayland`)して，VSCodeを起動し，試してみる．

　なんとなく誤変換が少なくなったような気がする(笑．拡張機能の`vscodevim`も誤変換に一役買っているようだ．disableにすると，もっと誤変換が少なくなった気がする(笑．

**VSCodeのHelp > About**
- Version: 1.92.1
- Commit: eaa41d57266683296de7d118f574d0c2652e1fc4
- Date: 2024-08-07T20:16:39.455Z
- Electron: 30.1.2
- ElectronBuildId: 9870757
- Chromium: 124.0.6367.243
- Node.js: 20.14.0
- V8: 12.4.254.20-electron.0
- OS: Linux arm64 6.1.21-v8+
***
## ショートカットファイルへの追加
　VSCodeの起動はショートカットファイルから起動することがほとんど．このときの環境変数がないといけない．[Linuxでショートカット起動時に環境変数を指定する方法
](https://www.exceedsystem.net/2020/08/23/how-to-set-environment-variables-in-linux-shortcut/)を参考に設定する．
```diff ins="env ELECTRON_OZONE_PLATFORM_HINT=wayland"
// /usr/share/applications/code.desktop
- Exec=/usr/share/code/code %F
+ Exec=env ELECTRON_OZONE_PLATFORM_HINT=wayland /usr/share/code/code %F
```


