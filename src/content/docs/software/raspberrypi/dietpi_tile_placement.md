---
title: DietPi(bookworm)でアプリをタイル配置させたい．
description: Dietpiでは標準でできないので，できるようにする方法を記す．
---
　DietPiの初期状態ではWindowsのようにショートカットキー(Windowsキー+矢印)でアプリケーションをタイル配置することができない．知らないだけかもしれないが．

　検索すると手軽にできそうなquicktileというツールをみつけたので，インストールしてみた．

**参考**
- quicktileの場所 : https://github.com/ssokolow/quicktile
- インストール参考資料 : https://ssokolow.com/quicktile/installation.html

## インストール手順
```bash title="依存モジュールのインストール"
sudo apt install python3 python3-pip python3-setuptools python3-gi python3-xlib python3-dbus gir1.2-glib-2.0 gir1.2-gtk-3.0 gir1.2-wnck-3.0
```

```bash title="ダウンロードツールのインストール"
sudo apt install git
```

```bash title="quicktileのダウンロード"
git clone https://github.com/ssokolow/quicktile.git
```

```bash title="インストール"
cd quicktile
./install.sh
```

:::caution
`error: externally-managed-environment`が出るが、気にしない。
:::

## 動作確認
　dietpiの再起動後，Ctrl+Alt+→（テンキーの6）を押せば，アプリが画面上で右に移動する．

