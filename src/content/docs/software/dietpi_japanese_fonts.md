---
title: DietPiにおける日本語フォント．
description: DietPiにおける日本語フォントのインストール．
---
　ラズパイを使った環境はいつでも壊れて（壊して）いいように考えているので，クリアインストールした後に調べなくてもいいように，忘れないために記事にしておく．以下を実行せよ．

```bash
sudo apt install fonts-noto-cjk fonts-noto-color-emoji
```

　これをやってから，ロケールを日本UTF-8にせよ．「fonts-noto-color-emoji」は絵文字のフォント．ブラウザ上で「いいね」の絵文字とか表示されるようにする．
