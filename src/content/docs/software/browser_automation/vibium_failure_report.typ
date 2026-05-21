#import "../../../../libs/theme.typ": theme, important-point, plain-box, code-box, note-box, supplement-box
#show: theme

#metadata((
  title: "Vibiumとの死闘と敗北：Linux VPS環境でのブラウザ自動化の罠",
  description: "最新の自動化ライブラリVibiumをLinux VPS環境で動かそうとして直面した問題をまとめた．",
  lastUpdated: true,
)) <frontmatter>


#text(size: 0.8em, fill: gray)[※ 本記事は、Vibiumとの「死闘」の記録を生成AI（Antigravity）の支援を受けてまとめ直したものです。]

#note-box(title: [死闘の結論(2026/03時点)])[
  - 「サーバーサイド環境（特にSandbox制限のあるVPS）において、ブラウザの起動引数（--no-sandbox等）を外部から確実に制御できないライブラリは、本番採用を見送るべきである」 
  - Vibiumはモダンな設計だが、エンジンの仕様上、肝心の引数制御がブラックボックス化されており、制約の多いサーバー環境では致命的な障害となった。
]


#supplement-box(title: [死闘の要約])[
  - *開発環境 vs 本番環境*: Windows環境では完璧に動作したが、Linux VPS（Ubuntu 24.04）上では `Browser crashed with exit code 1` で即死。
  - *執念のデバッグ*: エンジンの手動インストール、OS依存ライブラリの網羅、環境変数による制御など、持てる技術を尽くして環境構築に挑んだ。
  - *Sandboxの壁*: Linuxサーバーで必須となる `--no-sandbox` フラグを、ライブラリが内部で握り潰してしまう（または透過させない）ことが致命傷となった。
  - *戦略的撤退*: ツールを動かすという本来の目的を達成するため、枯れた技術（Puppeteer）への移行による「戦略的撤退」を選択した。
]

== はじめに



　最新の自動化ライブラリである「Vibium」を使い、ポイ活を自動化するツールを作成した。開発機（Windows / Node.js）では完璧に動作したが、いざ本番環境であるLinux VPS（XServer VPS / Ubuntu 24.04 / Bunでビルド）へデプロイし，実行した際に想定外の「壁」に阻まれて敗北した。


== 発生した問題

　ビルドしたバイナリをLinux環境で実行した際、まず直面したのは「エンジン自体が見つからない」という初歩的かつ高い壁だった。

#supplement-box(title: "最初のエラー: Vibiumエンジンがない")[
```text
[ERROR] アンケート自動実行プロセスでエラーが発生しました: Could not find vibium binary. Set VIBIUM_BIN_PATH environment variable or install @vibium/linux-x64
Error: Could not find vibium binary. Set VIBIUM_BIN_PATH environment variable or install @vibium/linux-x64
```
]

　これに対し、エンジンを別途インストールしてパスを通すなどの対応を行った結果、次に以下のエラーへと進展（「死闘」が本格化）した。

#supplement-box(title: "2番目にして致命的なエラー: ブラウザがクラッシュ")[
```text
[ERROR] アンケート自動実行プロセスでエラーが発生しました: Browser crashed with exit code 1
BrowserCrashedError: Browser crashed with exit code 1
```
]


== 試行錯誤のプロセス

=== 1. バイナリの欠如
　Vibiumのエンジン自体は実行ファイルに含まれていなかった。そのため，実行環境にVibiumエンジンをインストールし、パスを明示的に指定する必要があった。

- *対応*: 以下のコマンドをVPS側で実行。エンジンをインストールし、環境変数でその場所を教えることで起動を試みた。
#code-box[
```bash
# エンジン(バイナリ)のインストール
npm install @vibium/linux-x64

# バイナリのパスを環境変数にセット
export VIBIUM_BIN_PATH=$(pwd)/node_modules/@vibium/linux-x64/bin/vibium
```
]


=== 2. Chromeの依存ライブラリ不足
　エンジンのパスを通したことで「バイナリが見つからない」エラーは消えたが、次に「Browser crashed（ブラウザがクラッシュ）」という抽象的なエラーに変化した。

　この原因を特定するためには、まず**「OSがChromeを動かすための最低限のパーツ（共有ライブラリ）を備えているか」**を検証し、問題を切り分ける必要があった。Ubuntuの最小構成サーバでは、GUI関連のライブラリが標準で入っていないことが多いためである。

- *対応*: 以下のパッケージを網羅的にインストール。これにより、OSレベルでの「欠損」を原因から除外した。
#code-box[
```bash
sudo apt install -y libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 \
     libcups2t64 libdrm2 libxkbcommon0 libxcomposite1 \
     libxdamage1 libxrandr2 libgbm1 libasound2t64 \
     libpango-1.0-0 libcairo2
```
]
- *結果*: **エラー内容は変わらず「Browser crashed」のままだった。** しかし、これにより「ライブラリ（ファイル）がないから起動できない」という線は消え、問題は「起動はしようとしているが、OSから拒否されている」という次のレイヤーへ絞り込まれた。

=== 3. Sandboxの壁（決定打）
　ライブラリ不足を解消してもクラッシュが続く。この状況から、Linuxサーバー特有の**「Sandbox（隔離機能）による実行制限」**が真犯人であると推測した。root権限や限定的な環境では、`--no-sandbox` フラグを明示的に付けない限り、Chromeはセキュリティ保護のために即座にプロセスを終了する仕様だからである。
- *ライブラリの制約*: `browser.start({ args: [...] })` で引数を渡しても、Vibiumエンジン側で無視される仕様。
- *ラッパースクリプト戦略*: 
  ライブラリ側が起動引数を透過させないなら、**「ブラウザそのものを偽装する」**というアプローチを取った。具体的には、以下の内容で `google-chrome` という名前のシェルスクリプトを自作した。
#code-box[
  ```bash
  #!/bin/bash
  # 本物のChromeバイナリを呼び出す際に、強制的にフラグを差し込む
  exec /usr/bin/google-chrome --no-sandbox --disable-setuid-sandbox "$@"
  ```
] 
  このスクリプトに実行権限を与え、環境変数 `PATH` の先頭に配置することで、Vibiumに「偽のChrome」を本物だと思わせて掴ませ、無理やり設定を注入することを狙った。

- *PATHの操作の結果*: 
  シェル上で `google-chrome --version` を叩けば自作スクリプトが呼ばれ，偽装は成功している状態になったが、Vibiumからの起動では依然としてクラッシュが続いた。Vibiumのエンジンが内部で `PATH` を無視してバイナリを直接絶対パスで探索しているか、シンボリックリンクを解決して実体の実行ファイルを特定している可能性もあり、この「中間者攻撃」的な戦略も虚しく回避されてしまった。


=== 4. ブラウザ専用版の導入
  ラッパースクリプトすら回避される状況に、もはや現状のOS環境にあるChrome（google-chrome-stable）を使うこと自体に限界があると考えた。そこで、Vibiumエンジンそのものの能力を改めて探るため、`vibium --help` を実行し、利用可能なオプションを精査した。

- *新たな発見*: 
  ヘルプ画面を確認したところ、Vibium自身に `install` というサブコマンドが存在し、**「Chrome for Testing（自動テスト専用のブラウザ）」** を独自にダウンロード・管理する機能を備えていることが判明した。「専用のブラウザをVibium自身の管理下で動かせば、権限や設定の問題を内部的に解決してくれるのではないか」という最後の望みをかけ、`vibium install` を実行した。

- *結果*: 
  再実行してみたところ、今までの「即死」とは異なり、数秒間はエラーが出ずにプロセスが存続した。期待が高まったが、結局は**「Browser crashed with exit code 1」**に終わった。

　OS標準のブラウザでも、Vibium純正(？)のブラウザでも、VPS環境（Sandbox制限）という巨大な壁の前では同様の末路を辿ることを痛感し、ここでVibiumによる解決は不可能であるとの確信に至った。



== Puppeteerへの切り替え

　Vibiumはモダンで使いやすいAPIを備えているが、**「ブラウザへの起動引数を透明に透過させる」** という、サーバーサイド環境において極めて重要な制御がエンジンの仕様上困難であった。

　もともとPuppeteerで実装していたので，そちらに戻すことにした．Web上にはさまざまな情報が転がっているので，問題があっても対処しやすいので．

== まとめ

#note-box(title: "教訓")[
　「最新のライブラリは開発環境では素晴らしいが、制約の多いサーバー環境では、枯れた技術（Puppeteer）の方が最終的な手離れが良い」という、古典的ながら重要な教訓を得た。
]

