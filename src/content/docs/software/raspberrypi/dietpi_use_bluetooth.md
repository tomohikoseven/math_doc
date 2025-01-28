---
title: DietPi(bookworm)にてbluetoothを使うために．
description: Raspberry PiのDietPi環境でBluetoothを有効にし、Bluemanを使用してデバイスを管理する方法を解説します。必要なパッケージのインストール手順や設定方法を詳しく紹介します。
---
　bluetoothにつなげてYoutubeやTverを見たいけど，コマンドでつなげるやり方わからなかったし，GUIのほうがわかりやすいので何かないかと調べたら，Blueman(Bluetooth Manager）があったので、インストールしてみた。

:::tip[つまずきポイント]
- raspberry piを使っているなら、raspi-configからbluetoothをonにする必要がある。
  - OSがdietpiなら，dietpi-configから．
- pulseaudio-module-bluetoothを別途インストールする必要がある。
:::

## Bluemanインストール前に確認すること．
- **dietpi-configからbluetoothをOnにする**．

「Advanced Options」＞「Bluetooth」の項目が「On」であることを確認．Onに変更したならOSを再起動する．

　/etc/modprobe.d/dietpi-disable_bluetooth.confを削除したり，/boot/config.txtをいじったり，pi-bluetoothをインストールしたりするので，Offのままではbluetoothは使えない．

- **起動後にbluetoothを自動起動する設定**

　bluetoothをOnにするときに「Bluetoothは自動的に有効にしますか？」とポップアップが出る。「はい」を押す。

## Bluemanのインストール
　推奨パッケージに`pulseaudio-module-bluetooth`が出てくるので、一緒にインストールしてしまう．
```bash
sudo apt install blueman --install-suggests
```

## Bluemanの起動
```bash
blueman-manager
```
コマンドでなくても，メニュー＞設定＞Bluemanマネージャーでも起動できる．
