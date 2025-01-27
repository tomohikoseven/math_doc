---
title: ラズパイ4Bをアクセスポイント(2.4GHz)にする．
description: Raspberry Pi 4Bを2.4GHz帯のWi-Fiアクセスポイントとして設定する手順を解説。USB Wi-Fiドングル（WDC-150SU2M）を用いたDietPi環境での具体的な設定方法を紹介し、古いAndroidタブレットの接続性向上やモバイルWi-Fiルーターの負荷軽減を目指します。
---
　Androidタブレット（TECLAST P80X）が古く，モバイルWifiのアクセスポイント5GHzに接続できずにいた．(モバイルWifiのアクセスポイントを2.4GHz/5GHzにして接続し，インターネット通信すればいい話.)

　だが，業務で使うTeamsが通信不良で接続が切れたりすると面倒なので，モバイルWifiの負荷をできるだけ落としたいという動機があり，タブレットはラズパイに接続してインターネットできるといいなと思い，１週間ほどかかって調査および実現をした．

**参考サイト**
- [Ubuntu 22.04にWDC-150SU2Mを挿し、APモードで使用する](https://lvnkae.tumblr.com/post/744059254067068928/ubuntu-2204%E3%81%ABwdc-150su2m%E3%82%92%E6%8C%BF%E3%81%97ap%E3%83%A2%E3%83%BC%E3%83%89%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)
  - dkmsのインストールはしていない．
- [https://github.com/ivanovborislav/rtl8188eu](https://github.com/ivanovborislav/rtl8188eu)
  - APモードにするため，ラズパイのドライバを変更する必要がある．
  - ドライバをラズパイにインストールするところまで．dkmsはインストールしていない．
- [Can’t install linux-headers](https://dietpi.com/forum/t/cant-install-linux-headers/6328)
  - ドライバのビルドではraspberrypi-kernel-headersを使う．
- [Raspberry Pi 5B(bookworm) アクセスポイント化＆ルータ化メモ](https://qiita.com/d-ebi/items/2b8e6113690f24487c3e)
  - IPフォワードの設定
- [Raspberry Pi 4B アクセスポイント化＆ルータ化メモ](https://qiita.com/d-ebi/items/00fa2d173601d44f8c94)
  - IPマスカレードの有効化，設定の永続化

**環境情報**
- RPi 4 Model B (aarch64)
  - DietPi v9.6.1
- WDC-150SU2M（タブレットをこいつに接続する（APモードにする）．2.4GHz帯で動作）
- モバイルWifi（5GHz帯．ラズパイ内蔵無線LANとつながっている）

:::caution
　ラズパイの不具合なのか，DietPiの不具合なのかわからないが，**USBWifiドングルを付けてラズパイを起動すると，wlan0が自動でモバイルWifiと接続しないとわかった**．起動する際は一旦外そう．
:::

:::tip[できなかったこと]
　（USBwifiドングルなど使わずに，）wlan0のネットワークインタフェースを仮想化してやればいいという記事はあったが，仮想化した方は2.4GHzで動作してくれなかった．どうしても5GHz帯になる．ラズパイ内蔵無線LANが5GHz帯で動作しているからだろうか．
- [Raspberry Pi 5B(bookworm) アクセスポイント化＆ルータ化メモ](https://qiita.com/d-ebi/items/2b8e6113690f24487c3e)
:::


## 環境構築（アクセスポイント化）
　上から順にコマンドを実行/ファイル修正をすればよい．

#### ドライバーインストールの準備
```bash title="ドライバのソースをダウンロード"
sudo apt install git
git clone https://github.com/ivanovborislav/rtl8188eu.git
```

```bash title="不足パッケージのインストール"
sudo apt install bc build-essential
```

```bash title="Linuxヘッダーのインストール"
sudo apt install raspberrypi-kernel-headers
```

#### ドライバーのインストール
<u>Makeファイルの修正</u>

　`git`で`clone`してできた`rtl8188eu`ディレクトリ内にある`Makefile`を修正する．ラズパイの場合は以下のように修正する．
```bash frame="none"
145行目：CONFIG_PLATFORM_I386_PC = nに変更
146行目：(OS 32bitの場合) CONFIG_PLATFORM_RPI_ARM = yに変更
147行目：(OS 64bitの場合) CONFIG_PLATFORM_RPI_ARM64 = yに変更
```

<u>コンパイルとインストール</u>

```bash title="コンパイルとインストール"
cd ./rtl8188eu
chmod +x install.sh
./install.sh -i
```

:::caution
「You need root permissions」って出力されるけど，無視．
:::

#### ネットワーク設定
　`ssid`と`wifi-sec.psk`(パスワード)は好きなものを設定．
```bash title="プロファイル作成・設定"
sudo apt install NetworkManager
sudo nmcli connection add type wifi ifname wlan1 con-name hotspot3 autoconnect yes ssid dietpi-ap3 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared ipv4.address 192.168.2.1/24 wifi-sec.key-mgmt wpa-psk wifi-sec.pairwise ccmp wifi-sec.proto rsn wifi-sec.psk "password"
```

```bash title="アクティベート"
nmcli con up hotspot3
```

<u>IPフォワード設定</u>
```diff
// /etc/sysctl.conf
- # net.ipv4.ip_forward=1
+ net.ipv4.ip_forward=1
```

```bash title="IPマスカレード設定"
sudo apt install iptables
sudo iptables -t nat -A  POSTROUTING -o wlan0 -j MASQUERADE
```

```bash title="設定の永続化"
sudo apt install -y netfilter-persistent iptables-persistent
sudo netfilter-persistent save
```

```bash title="端末(ラズパイ)の再起動"
sudo shutdown -r now
```

以上
***
