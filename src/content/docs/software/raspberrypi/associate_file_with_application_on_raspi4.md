---
title: ファイル（拡張子）と関連付けてアプリケーションを実行する．(ラズパイ)
description: ラズパイ上でファイル（拡張子）と関連付けて，アプリケーションを実行する実行する方法を紹介する．
---

　[webpをインストール](/software/webp_install_in_raspi4/)したのはいいが，コマンド実行で表示するのは面倒である．ファイルマネージャーからダブルクリックして表示するのが使いやすい．

　下記にファイル（拡張子）と関連付けてアプリケーションを実行する手順を示す．

## ファイルと関連付け
1. ファイルマネージャーから該当ファイルを右クリックし，プロパティを開く．
1. `一般`タブ > 開くアプリケーション の`カスタマイズ`を選択する．
![ファイルのプロパティ](../../../../assets/software/associate_file_with_application_on_raspi4/01_file_property_open_application_customize.webp)
1. `コマンドラインを指定`タブの`実行するコマンドライン`に`/usr/bin/vwebp %f`を入力する．
![アプリケーションの選択](../../../../assets/software/associate_file_with_application_on_raspi4/02_execute_command_and_application_name.webp)
1. `アプリケーションの名前`にわかりやすい名前を入力する．（入力後，OKを押す．）
1. ファイルのプロパティの`OK`ボタンを押し，完了する．

　以上の設定を行った上で，webpファイルをダブルクリックすると，画像が表示される．