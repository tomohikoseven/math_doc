// 文書全体の基本レイアウトを設定する関数
#let template(body) = {
  set text(font: "Noto Sans CJK JP", size: 12pt)
  set page(margin: 0.5cm, height: auto)
  set par(leading: 1em, spacing: 1.5em, justify: true)
  show heading: set block(above: 1.4em, below: 1em)

  // 見出し2の下に線を引く設定
  show heading.where(level: 2): it => {
    stack(
      it,
      v(0.7em),
      line(length: 100%, stroke: 0.5pt + black),
    )
  }

  body
}

// 💡アイコン付きの強調表示ボックス
// 重要な結論や、核心を突く文章を際立たせるために使用します
#let important-point(content) = {
  block(
    width: 100%,
    inset: 15pt,
    fill: rgb("#f0f9ff"),
    stroke: (left: 5pt + rgb("#0ea5e9")),
    radius: (right: 4pt),
    [
      #set text(size: 1.1em, weight: "bold", fill: rgb("#0369a1"))
      #grid(
        columns: (2em, 1fr),
        align: (center + horizon, left + horizon),
        text(size: 1.5em)[💡],
        content
      )
    ]
  )
}

// 画面幅いっぱいのシンプルな枠線ボックス
// テキストを中央揃えにし、さりげない背景色で項目を強調します
#let plain-box(content) = {
  block(
    width: 100%,
    inset: 10pt,
    stroke: 0.5pt + rgb("#e5e7eb"),
    fill: rgb("#fafafa"),
    radius: 3pt,
    align(center, content)
  )
}

// Astroの :::note 風のデザイン（important-pointのスタイルをベースに、タイトルと内容を分離）
#let note-box(title: [POINT], content) = {
  block(
    width: 100%,
    inset: 15pt,
    fill: rgb("#f0f9ff"),
    stroke: (left: 5pt + rgb("#0ea5e9")),
    radius: (right: 4pt),
    [
      // ヘッダー部分：アイコンとタイトル
      #set text(size: 1.1em, weight: "bold", fill: rgb("#0369a1"))
      #grid(
        columns: (2.2em, 1fr),
        align: (center + horizon, left + horizon),
        text(size: 1.5em)[💡],
        title
      )
      #v(0em)
      // 内容部分：通常のテキストスタイルに戻す
      #set text(size: 1.1em, weight: "bold", fill: rgb("#0369a1"))
      #content
    ]
  )
}

// 補足・用語解説用の落ち着いた枠囲み
#let supplement-box(title: none, content) = {
  block(
    width: 100%,
    inset: (x: 15pt, y: 12pt),
    fill: rgb("#f8fafc"), // 落ち着いた薄いグレー
    stroke: 0.5pt + rgb("#cbd5e1"), // 控えめな境界線
    radius: 4pt,
    [
      #set text(size: 0.95em) // 補足なので少しだけ文字を小さく
      #if title != none {
        [*#title*]
        v(0.3em)
      }
      #content
    ]
  )
}

// =====
// 数学用デザイン
// =====
// 定理用の落ち着いた枠囲み
#let theorem-box(title: none, content) = {
  block(
    width: 100%,
    inset: (x: 15pt, y: 12pt),
    fill: rgb("#f8fafc"), // 落ち着いた薄いグレー
    stroke: 0.5pt + rgb("#cbd5e1"), // 控えめな境界線
    radius: 4pt,
    [
      #if title != none {
        [*#title*]
        v(0.3em)
      }
      #content
    ]
  )
}

// 囲み文字を少し大きく見せるための微調整
#let circ(char) = text(size: 1.1em, baseline: 0.05em)[#char]
