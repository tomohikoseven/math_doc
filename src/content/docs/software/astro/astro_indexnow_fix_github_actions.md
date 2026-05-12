---
title: IndexNowの「No candidate urls need to submit」エラーをGitHub Actionsで解決する方法
description: GitHub ActionsのIndexNowアクションで更新が検知されず、Bingに通知が届かない問題をcurlコマンドによる直接通知で確実に解決する方法を解説します。
lastUpdated: true
prev: false
next: false
---

**【この記事の要約（TL;DR）】**
GitHub ActionsのIndexNow連携で「No candidate urls need to submit」と表示され更新が通知されない問題は、サイトマップの`<lastmod>`タグが不足していることによる誤判定が原因です。解決策として、外部アクションを使わずにGitHub Actionsから直接 `curl` コマンドでBing APIを叩くことで、確実にインデックス登録を促すことができます。

---

Microsoft Bing Webmaster Toolsで「IndexNowが機能していない」という警告が表示されることがあります。これは特にAstroなどの静的サイトジェネレーター（SSG）を使用している環境で発生しやすい問題です。

本記事では、複雑な設定を避け、シンプルな `curl` コマンドで確実に通知を送る方法を解説します。

## なぜIndexNowで「No candidate urls need to submit」と表示されるのか？

GitHub Actionsで一般的に使われているIndexNow送信用アクション（例: `bojieyang/indexnow-action`）を使用している際、以下のような現象が発生することがあります。

- **Actionsのログ**: `No candidate urls need to submit.` と表示され、送信がスキップされる。
- **Bing Webmaster Tools**: トップページに「IndexNowが機能していない」旨の警告が表示される。

### 原因：サイトマップの更新日時判定の不一致
多くのアクションは、サイトマップ内の `<lastmod>`（最終更新日時）タグを確認して「前回から更新があったか」を判定します。しかし、Astroなどのデフォルト設定ではサイトマップに更新日時が含まれていない場合があり、アクションが「更新なし」と誤判定して送信をスキップしてしまいます。

## 解決策：curlコマンドで確実にIndexNowを実行する方法

「賢すぎる判定」を回避し、確実にBingへ通知を届けるには、IndexNowのAPIエンドポイントを直接 `curl` で叩くのが最も確実で軽量な方法です。

### 手順1：IndexNowキーの配置確認
サイトのルートディレクトリ（Astroなら `public/` フォルダ直下）に `[キー].txt` というファイルを作成し、その中身も `[キー]` と一致していることを確認してください。

### 手順2：GitHub Secretsにキーを登録
GitHubリポジトリの **Settings > Secrets and variables > Actions** に、`INDEXNOW_KEY` という名前でキーの値を保存します。

### 手順3：GitHub Actionsワークフローの修正
`.github/workflows/deploy.yml` などのデプロイフローの最後に、以下のステップを追加します。

```yaml
    - name: IndexNow (Bing)
      run: |
        curl -i -X GET "https://www.bing.com/indexnow?url=https://[あなたのドメイン]/sitemap-0.xml&key=${{ secrets.INDEXNOW_KEY }}"
```

- **`-i` オプション**: 実行ログに `HTTP/2 200 OK` などのレスポンスが表示されるため、成功の確認が容易になります。
- **ドメインとファイル名**: `https://[あなたのドメイン]/sitemap-0.xml` の部分は、実際の環境に合わせて書き換えてください。

## この方法（curl直接叩き）のメリットは？

1. **判定漏れがゼロ**: 実行するたびに通知を強制するため、「更新が検知されない」というトラブルがなくなります。
2. **依存関係の排除**: 外部のGitHub Actionを利用しないため、メンテナンスの手間が減り、ワークフローも高速化します。
3. **デバッグが簡単**: ログにBingからの生のHTTPレスポンスが表示されるため、エラー時の原因特定が瞬時に行えます。

## FAQ：IndexNowに関するよくある質問

### Q: 手動で通知を送りすぎるとペナルティはありますか？
A: IndexNowは1日1万URLまでの制限がありますが、サイトマップを1日数回通知する程度であれば、通常の運用範囲内でありペナルティの心配はありません。

### Q: 通知後、いつBingに反映されますか？
A: 本サイトの検証では、`curl` 実行後5分程度でWebmaster Tools上のステータスが「正常」に切り替わりました。

## まとめ
IndexNowが正常に動作しない場合は、アクションの自動判定に頼らず、直接APIを叩くのが最も確実な解決策です。Actionsのログで `HTTP 200` を確認できれば、インデックス登録は正常にリクエストされています。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "headline": "IndexNowの「No candidate urls need to submit」エラーをGitHub Actionsで解決する方法",
      "description": "GitHub ActionsのIndexNowアクションで更新が検知されず、Bingに通知が届かない問題をcurlコマンドによる直接通知で確実に解決する方法を解説します。",
      "author": {
        "@type": "Person",
        "name": "tomohikoseven"
      }
    },
    {
      "@type": "HowTo",
      "name": "GitHub ActionsでIndexNowを確実に実行する手順",
      "step": [
        {
          "@type": "HowToStep",
          "name": "IndexNowキーの配置確認",
          "text": "サイトのルートディレクトリ（public/など）に [キー].txt を配置し、中身にキーを記述します。"
        },
        {
          "@type": "HowToStep",
          "name": "GitHub Secretsへのキー登録",
          "text": "GitHubリポジトリのSettings > Secrets and variables > Actions に INDEXNOW_KEY を登録します。"
        },
        {
          "@type": "HowToStep",
          "name": "ワークフローの修正",
          "text": "GitHub ActionsのYAMLファイルにcurlコマンドによるAPIリクエストステップを追加します。"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "手動で通知を送りすぎるとペナルティはありますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IndexNowは1日1万URLまでの制限がありますが、通常のサイトマップ通知であればペナルティの心配はありません。"
          }
        },
        {
          "@type": "Question",
          "name": "通知後、いつBingに反映されますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "検証では、curl実行後5分程度でWebmaster Tools上のステータスが正常に切り替わりました。"
          }
        }
      ]
    }
  ]
}
</script>

