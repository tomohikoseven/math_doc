---
title: WordPressでの数式入力・表示の決定版【KaTeX】
description: WordPressにおいて数式表示はどのプラグインを使えばいいのか．
---
　~~WordPressを最近始めた~~。いや，WordPressを辞めた．サーバーレンタル料をかけずにブログができることがわかったので．以下，WordPressでブログをやっていたときの記事です．

***
　数学のブログを書こうと決めて、色々と数式を書き始めたのはよいが、納得できる入力方法・Web表示の方法が決まらなかった。しかし、それが決まったので、整理する。

## 結論
　[KaTeXプラグイン](https://ja.wordpress.org/plugins/katex/)にショートコード変更スクリプトを追加して、
- 数式は[KaTeX](https://katex.org/)でWeb表示.
- 入力はプラグイン.

という構成にした。

### なぜ$\KaTeX$で表示するのか．
　WordPressでブログサイトを構築する際、数式表示ではMathJaxの検索結果が多い．しかし、<mark>$\KaTeX$の方がレンダリングが速い</mark>とわかった．（一番は，数式部分をサーバ側で事前に静的化して，それを表示させるようにしたい．）

### なぜ$\KaTeX$プラグインで入力するのか.
　このプラグインの特徴は、KaTeXブロック（ディスプレイスタイル）に<mark>入力した数式がエディタに表示される</mark>こと（インラインスタイルでは表示されない。）。これが気に入った。

### ショートコードが長い問題を解決する. 
　KaTeXでの数式表示では、インラインスタイルのために`[katex]~[katex]`を大量に入力することになる．Simple MathJaxやLaTeXなどはドルマーク(`$~$`)でよい。

　これを解決するために、下記スクリプトを追加することにした。(KaTeX公式の該当箇所は[こちら](https://katex.org/docs/autorender)。下記はdelimiters配列内を2行削除している。）
```js
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
          // customised options
          // • auto-render specific keys, e.g.:
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
          ],
          // • rendering keys, e.g.:
          throwOnError : false
        });
    });
</script>
```

　これによって、<mark>長いショートコードをドルマークで簡略化できる</mark>。ディスプレイスタイルもドルマーク２つでも入力できる．ただしこのときは改行すると数式表示ができなくなるので，改行をしたいほどの長いコマンドはKaTeXブロックを使うべき．

### CSSの設定
　数式内の日本語のフォントが気になったので，CSSに対応を入れた．また，モバイル表示対応で長い数式はスクロールすると表示できるようにした．以下その設定．
```css
/*KaTeXの日本語フォント設定*/
/*本文と一致させる*/
.cjk_fallback {
	font-family: var(--cocoon-default-font);
	font-size: var(--cocoon-default-text-size);
}
/*KaTeXブロックのモバイル表示対応*/
/*画面からはみ出すときは横スクロールが表示される*/
.katex-html {
	overflow-y: hidden;
	overflow-x: auto;
}
```
　また，行内数式と日本語の間隔がせまい感じがしたので，スペースを入れるようにした．
```css
/*行内数式の前後にスペースを入れる*/
span.katex::before, span.katex::after {
	content: " ";
}
```
