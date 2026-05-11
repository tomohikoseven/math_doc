---
title: Bing IndexNowが機能しない問題をGitHub Actionsのcurlコマンドで解決する
description: GitHub ActionsのIndexNowアクションで「No candidate urls need to submit」と表示され、Bingに通知が届かない問題を解決する方法を解説。
lastUpdated: true
prev: false
next: false
---

Microsoft Bing Webmaster ToolsでIndexNowが機能していない旨のメッセージが表示された。Webmaster Toolsの利用開始当初から表示されており、セットアップを試みたが解決しなかった。生成AI（Antigravity）の協力により、この問題を解決することができた。

この記事では、複雑なGitHub Actionsを使わずに、シンプルな `curl` コマンドで確実に通知を送る方法を紹介する。

## 1. 発生していた問題
GitHub Actionsで一般的に使われている IndexNow 送信用アクション（例: `bojieyang/indexnow-action`）を使用している際、以下のような現象が発生することがある。

- **Actionsのログ**: `No candidate urls need to submit.` と表示され、実際には送信がスキップされる。
- **Bing Webmaster Tools**: トップページに「IndexNowが機能していない」旨の警告が表示される。

### 原因
多くのアクションは、サイトマップ内の `<lastmod>`（最終更新日時）タグを確認して「前回から更新があったか」を判定する。しかし、Astroなどの静的サイトジェネレーターでサイトマップに更新日時が含まれていない場合、ツールが賢く判定しすぎてしまい、アクションが「更新なし」と誤判定して送信をスキップしてしまう。その結果、記事の更新があってもBingに通知が届かない状態となる。

## 2. 解決策：curlコマンドによる手動通知
「賢すぎる判定」を避け、確実にBingへ通知を届けるには、IndexNowのAPIエンドポイントを直接 `curl` で叩くのが最も確実である。

### 手順1：IndexNowキーの確認
まず、サイトのルート（Astroなら `public/` フォルダ内）に `[キー].txt` というファイルがあり、その中身も `[キー]` と一致していることを確認する。

### 手順2：GitHub Secretsの設定
GitHubリポジトリの **Settings > Secrets and variables > Actions** に、`INDEXNOW_KEY` という名前でキーを保存する。

### 手順3：ワークフローの修正
`.github/workflows/deploy.yml` などのデプロイフローの最後に、以下のステップを追加する。

```yaml
    - name: IndexNow (Bing)
      run: |
        curl -i -X GET "https://www.bing.com/indexnow?url=https://[あなたのドメイン]/sitemap-0.xml&key=${{ secrets.INDEXNOW_KEY }}"
```

- `-i` オプションを付与することで、実行ログに `HTTP/2 200 OK` などのレスポンスが表示され、成功したかどうかが一目でわかるようになる。
- サイトマップのファイル名（`sitemap-0.xml` など）は、自身のプロジェクトの出力結果に合わせて変更が必要である。

## 3. この方法のメリット
- **判定漏れがない**: 実行するたびに「このサイトマップを再スキャンしてほしい」と伝えるため、確実に通知が届く。
- **軽量・高速**: 外部アクションの読み込み時間を短縮でき、標準の `curl` を使うため依存関係もない。
- **デバッグが容易**: ログにBingからの生のレスポンスが表示されるため、エラー時の原因特定が容易である。

## まとめ
「IndexNowが動かない」ときは、アクションの内部判定に頼らず、直接APIを叩くのが近道である。Actionsのログで `HTTP 200` が確認できれば、間もなくBing側のステータスも正常に戻る。本サイトでは、この修正を実行後、5分程度でIndexNowが正常な表示に切り替わった。
