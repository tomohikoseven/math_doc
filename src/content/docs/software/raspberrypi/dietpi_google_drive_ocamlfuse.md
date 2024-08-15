---
title: ラズパイ4Bにgoogle-drive-ocamlfuseをインストールする．
description: ラズパイ4Bにgoogle-drive-ocamlfuseをインストールする．
---
**参考サイト**
- https://github.com/astrada/google-drive-ocamlfuse/wiki/How-to-install-from-source-on-Debian-Jessie

## インストール手順
```bash title="依存関係のあるパッケージをインストール"
sudo apt install opam ocaml make libfuse-dev camlp4-extra build-essential pkg-config
```

```bash title="fuseグループを作成"
sudo groupadd fuse
```

```bash title="fuseグループにユーザを追加"
sudo usermod -a -G fuse <ユーザ名>
```

```bash title="フォルダの所有権を変更"
sudo chown root:fuse /dev/fuse
```

```bash title="フォルダの権限を変更"
sudo chmod 660 /dev/fuse
```

```bash title="google-drive-ocamlfuseをインストールする"
opam init
opam update
opam google-drive-ocamlfuse
```
`opam google-drive-ocamlfuse`の実行で，`opam-depext`のインストールも行う．つまり，特に何も考えずEnterキーを押して進む．

その後，下記コマンドを実行．何をやっているかはわからない．

```bash frame="none"
. /home/<ユーザ名>/.opam/opam-init/init.sh > /dev/null 2> /dev/null || true
```

### クライアントIDとシークレットを取得する
　[Google API Console](https://console.developers.google.com/)でGoogle DriveにアクセスするためのクライアントIDとシークレットを取得する．
- 参考ページ：https://help.talend.com/r/ja-JP/8.0/google-drive/how-to-access-google-drive-using-service-account-json-file-a-google

　参考ページのとおりにプロジェクトを新規作成すると，認証がGoogleに許可されるまで使えない．何日か待つ．

### google driveをマウントする．
```bash title="google driveをマウントする．"
google-drive-ocamlfuse -id <クライアントID> -secret <シークレット> マウントするディレクトリパス
```

　これでマウントされ，ファイルマネージャやコマンドでgoogle driveの中が見える．
