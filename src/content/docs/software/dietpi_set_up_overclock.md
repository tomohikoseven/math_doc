---
title: ラズパイ4B+bookwormをオーバークロック.
description: ラズパイ4B+bookwormをオーバークロックする手順.
---
**参考サイト**
- [ラズパイをオーバークロックして使う（メモ）](https://wisteriahill.sakura.ne.jp/CMS/WordPress/2024/01/16/raspberry-pi-overclock/)
- [Raspberry Pi 4+Bullseyeのオーバークロックの設定](https://raspida.com/overclock-rpi4-bullseye#index_id9)

:::tip[最終的には...]
　CPUの温度が70度くらいで安定してしまったため，オーバークロックはやめた．GPUもMaxにしたのが原因かも．
:::

## 手順
　以下のコマンド実行およびファイル修正を行う．
```bash title="環境の最新化"
sudo apt update
sudo apt dist-upgrade
```

**設定値の追加**

```diff
// /boot/firmware/config.txt
+ arm_freq=2000
+ over_voltage=6
+ gpu_freq=750
```
:::caution
`arm_freq`を`2147`にしたところ，再起動できなかった．
`wpa_supplicant.service`の起動ができないようだった．
:::

```bash title="再起動"
sudo reboot now
```

### 再起動ができなくなったら...
- [Raspberry Pi 4+Bullseyeのオーバークロックの設定](https://raspida.com/overclock-rpi4-bullseye#index_id9)

　ここに書いてあるが，ラズパイのmicroSDカードを別PCに挿し，config.txtを探し，追加した設定値を変更もしくは削除する．
