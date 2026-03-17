---
title: ADBを使ったAndroid自動操作入門 〜スマホ専用ポイ活の第一歩〜
description: Node.jsとADBを使ってAndroid端末のChrome操作を自動化し、スマートフォン専用の「ポイ活」を効率化するための技術情報をまとめました。
lastUpdated: true
prev: false
next: false
---

## はじめに

　現代の「ポイ活（ポイント活動）」の中には、**スマートフォン端末からアクセスしないと実行できない案件**が数多く存在します。PCのブラウザでユーザーエージェントを偽装しても弾かれてしまうような強固なサイトに対抗するためには、本物のAndroid端末をPCから物理的・システム的に操作（自動化）するアプローチが最も確実です。

　本記事では、PlaywrightやVibiumといった高度なブラウザ自動化ライブラリを使わず、Androidの標準デバッグ機能である **ADB (Android Debug Bridge)** と **Node.js** だけを用いて、極限まで軽量かつ確実にAndroid上のChromeを自動起動し、指定のWebサイト（今回はGoogle）を開くまでの基礎を解説します。

## 環境情報

本記事の手順は、以下の環境で動作確認を行っています。

- **OS**: Windows 10 Pro
- **Node.js**: v24.11.1
- **ADB**: Android Debug Bridge version 1.0.41
- **端末**: Android OS 13 スマートフォン (Chromeブラウザインストール済み)

:::note[なぜ高度なライブラリを使わないのか？]
PlaywrightのAndroidサポートは非常に強力ですが、端末やセキュリティ設定によっては「高度なプログラム制御（CDP接続）」がブロックされ、真っ白な画面から進まないエラーが発生することがあります。私が使っているZTE Libero 5G Ⅲではそうでした．ADBの標準コマンドのみを利用する「純粋ADB制御」であれば、そうした制約をすり抜けて、人間が手で操作しているのと全く同じレベルの自動化が実現可能です。
:::

## セットアップ方法

自動化を始める前に、PCとスマートフォン双方の準備が必要です。

### 1. PC側の準備
1. **Node.js のインストール**
   [Node.js公式サイト](https://nodejs.org/) から最新版をインストールします。
2. **ADBコマンドの導入**
   [Android SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools) をダウンロードし、解凍したフォルダへのパスをWindowsの「環境変数 (Path)」に登録します。
   ターミナル（PowerShellなど）で `adb version` と入力し、バージョン情報が表示されれば成功です。

### 2. スマートフォン側の準備
1. **開発者向けオプションの解放**
   設定の「端末情報」などにある「ビルド番号」を7回連続でタップし、開発者モードを有効にします。
2. **USBデバッグの有効化**
   「開発者向けオプション」メニューに入り、「USBデバッグ」をONにします。
3. **PCとの接続と権限許可**
   USBケーブルでPCとスマートフォンを繋ぎます。
   - スマホ画面に「USBデバッグを許可しますか？」と出たら **許可（OK）** を押します。
   - USBの接続用途を聞かれたら **「ファイル転送（MTP）」** を選択します。
4. **画面ロックの解除**
   自動化ツールを動かす際は、**必ず画面ロックを解除し、画面をオン（アクティブ状態）**にしておいてください。画面が消灯していると操作コマンドが反映されません。

### 3. 接続テスト
コマンドプロンプトやPowerShellを開き、以下のコマンドで接続を確認します。

```powershell
adb devices
```

```text title="実行結果のサンプル"
List of devices attached
1234567890abcdef    device
```

`device` と表示されていれば完璧です。もし `unauthorized` や `offline` と表示された場合は、スマホの画面に許可ダイアログが出ていないか確認し、ケーブルを挿し直してください。

## ADBコマンド単体でChromeを起動してみる

Node.jsで本格的なスクリプトを書く前に、まずはADBコマンドだけで直接スマホを操作できることを確認してみましょう。
ターミナル（PowerShell等）に以下の1行をそのまま貼り付けて実行してみてください。

```powershell
adb shell am start -a android.intent.action.VIEW -d "https://www.google.com" com.android.chrome
```

このコマンドを実行した瞬間、スマートフォン上でChromeが立ち上がり、Googleのトップページが表示されれば成功です！
このように、ADBを使えばコマンド一つでアプリの起動やURLの指定が可能です。これをNode.jsから連続して実行させるのが、今回の自動化の仕組みです。

## 実装：Node.jsからADBを使って自動化する

準備が整ったら、実際にNode.jsからADBコマンドを発行してスマホを操ってみましょう。
外部ライブラリ（npmパッケージ）のインストールは一切不要です。標準モジュールの `child_process` を使います。

適当なフォルダに `launch_adb.js` というファイルを作成し、以下のコードを記述します。

```javascript title="launch_adb.js"
const { execSync } = require('child_process');

// ADBコマンドを簡単に実行するためのヘルパー関数
function adbShell(command) {
    try {
        console.log(`[実行] adb shell ${command}`);
        // stdioの設定で、余計なエラー出力を抑制しつつ実行
        return execSync(`adb shell ${command}`, {
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'ignore']
        });
    } catch (error) {
        console.error("コマンドの実行に失敗しました。スマホが接続されているか確認してください。");
        process.exit(1);
    }
}

// 待機用の便利関数（ミリ秒指定）
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('===== ADB自動操作テスト =====');

    // 1. 指定のURL（Google）をChromeで開くインテント（命令）を送信
    const url = "https://www.google.com";
    const pkg = "com.android.chrome"; 
    
    console.log('Chromeを起動してGoogleを開きます...');
    adbShell(`am start -a android.intent.action.VIEW -d "${url}" ${pkg}`);

    // ブラウザが起動し、ページが読み込まれるのを待つ
    await sleep(5000); 

    // 2. 例として、画面の少し下をタップする操作
    // ※ 座標(x=500, y=1000) はお使いの端末に合わせて変えてください
    console.log('画面をタップします...');
    adbShell('input tap 500 1000');

    console.log('\n動作確認完了です！スマホの画面を見てみましょう。');
}

main();
```

### 実行方法

ターミナルで先ほど作成したファイルの場所に移動し、Node.jsで実行します。

```powershell
node launch_adb.js
```

スマホの画面が自動で切り替わり、Chromeが立ち上がってGoogleのトップページが表示されれば成功です！

:::tip[補足：今回使用したADBコマンドの解説]
スクリプト内で使用している、Android特有のコマンドが何をしているのか簡単に解説します。

1. **`am start -a android.intent.action.VIEW -d "URL" パッケージ名`**
   Androidの「Activity Manager (`am`)」に対して、指定したURLを開くActivity（画面）を起動せよ、という命令（インテント）を送るコマンドです。
   末尾の `com.android.chrome` を別のブラウザのパッケージ名（例：Braveなら `com.brave.browser`）に変更すれば、好きなブラウザでサイトを開くことができます。

2. **`input tap X Y`**
   画面上の指定した座標 (X, Y) を1回タップします。自動化において最も直感的で多用するコマンドです。
:::

:::note[より高度な自動化のためのADBコマンド]
実際に何十記事も読み進めるような本格的なポイ活スクリプト（本プロジェクトの完成版 `launch_adb.js` など）を作る際は、以下のコマンドも大活躍します。

1. **`input swipe X1 Y1 X2 Y2 [期間ms]`**
   指定した座標（X1, Y1）から（X2, Y2）へとスワイプ（スクロール）します。画面を下にスクロールして「続きを読む」ボタンを探す際などに必須となる操作です。
   最後の期間を指定することで、「ゆっくりスワイプする」「素早く弾く（フリック）」を切り替えられます。

2. **`uiautomator dump /dev/tty`**
   現在画面に表示されている要素（ボタンのテキストや構造などのHTMLに近いもの）をXML形式で一気に取得します。
   例えば，XMLの中から「スタンプGET」という文字列のX・Y座標をNode.js側で計算し、そこに向かって `input tap` を撃ち込むことで、端末ごとの画面サイズの違いに影響されない「スマートな自動タップ」が実現可能になります。
:::

## 終わりに

今回は「指定したURLを開く」という最も基礎的な部分を解説しました。
ここからさらに `input tap`（タップ）や `input swipe`（スクロール）といったコマンドを組み合わせたり、`uiautomator dump` を使って画面のテキスト情報を解析することで、複雑な「スマホ専用ポイ活」を全自動化する独自のBotを作り上げることができます。

スマートフォンの物理的な制約を越えて、PCからすべてをコントロールする自動化の世界を楽しんでみてください！

## 自作ポイ活ツールの紹介

この記事で解説したADBの基礎と、先ほど紹介した `swipe` や `dump` などの応用コマンドを組み合わせて構築した**「ヨミタメ広場」向けの自動ポイ活ツール**の実装コードを、GitHubで公開しています。

- **GitHubリポジトリ**: [tomohikoseven/yomitame-hiroba-bot](https://github.com/tomohikoseven/yomitame-hiroba-bot)

重いブラウザ自動化ライブラリを使わず、Node.jsの標準機能とADBコマンドのみで完結する「純粋ADB版」のスクリプトなどが含まれています。
ご自身の環境で実際に動かしながらコードを追ってみると、より実践的なAndroid自動操作の仕組みが理解できると思いますので、ぜひ参考にしてみてください！
