#import "../../../../libs/theme.typ": theme, theorem-box, circ, important-point, note-box, supplement-box, plain-box
#show: theme

#metadata((
  title: "1.1 序節を書き直す（解析入門Ⅰ（小平邦彦著）岩波講座）",
  description: "解析入門Ⅰ（小平邦彦著）岩波講座 第1章 第1節を書き直す．何を主張しているのか分かりづらいので．",
  lastUpdated: true,
  draft: true,
)) <frontmatter>

#outline(title: "目次", indent: 1em)
#v(1em)
#line(length: 100%, stroke: 0.5pt + gray)
#v(1em)

　解析入門Ⅰ（小平邦彦著）の「第1章 実数」の記述内容を自分なりに書き直している．
なぜなら，読み進めると途中で何をしているのかわからなくなることがあるので．
これは日本の数学参考書の書き方の問題だろうと思う．つまり，定理とその証明を丁寧に書いたところで，結局何を主張しているのかわからないからだ．
何が言いたいのか主張をしっかり説明していないと，文字を操作してうまく証明できる人材が生まれるだけだ．


= §1.1 序章

#note-box(title: [Q: 「§1.1 序章」の主張は何か．])[
  A: 高校数学において，実数の厳密性に欠けていることを指摘している．
]

== 高校数学における実数は厳密性に欠ける
　高校数学における実数の扱いは、その存在を*「図形的直観」*に委ねているという点で厳密性に欠けている。
有理数は単位線分の等分割によって目盛りとして論理的に構成できるが、数直線上の隙間を埋める無理数については、それが「点」として存在することを証明なしに自明としているからだ。
実数と数直線を同一視するという素朴な前提の裏には、この「直観的な連続性」をいかに論理的に定義するかという、解析学における重要な課題が隠されている。

=== 高校数学における実数の定義
　直線上の一点 $O$ と，それとは異なる一点 $E$ を定めて，$O$ を原点，$O E$ の距離を単位の長さ $1$ と仮定する．この直線を*数直線*という．

#box(width: 100%, inset: 15pt, fill: rgb("#f8fafc"), stroke: 0.5pt + rgb("#cbd5e1"), radius: 4pt)[
  #set align(center)
  #stack(
    spacing: 1.2em,
    text(size: 0.9em, weight: "bold", fill: rgb("#475569"))[数直線のイメージ],
    
    block(width: 80%)[
      // 点のラベルと座標
      #grid(
        columns: (1fr, 1fr, 1.5fr, 1fr),
        align: center,
        [$O$], [$E$], [$A$], [],
        [($0$)], [($1$)], [($a$)], []
      )
      #v(-0.2em)
      // 軸と目盛り
      #box(width: 100%, height: 12pt)[
        #place(center + horizon, line(length: 100%, stroke: 1pt + rgb("#94a3b8")))
        #grid(
          columns: (1fr, 1fr, 1.5fr, 1fr),
          align: center + horizon,
          box(width: 2pt, height: 10pt, fill: rgb("#1e293b")), // O
          box(width: 2pt, height: 10pt, fill: rgb("#1e293b")), // E
          box(width: 2pt, height: 10pt, fill: rgb("#1e293b")), // A
          []
        )
      ]
    ],
    v(0.3em),
    text(size: 0.85em, fill: rgb("#64748b"))[各点 $A$ に対して実数 $a$ が座標として一意に定まる]
  )
]

　直線上の任意の点 $A$ に対して，原点 $O$ からの距離（向きを考慮）を $a$ とし，この実数 $a$ を点 $A$ の *座標* と呼ぶ．高校数学においては，この *直線上の点と実数の集合が一対一に対応すること* を前提として議論が進められる．言い方を変えると，*実数とは数直線上の点のことである（同一視する）* と定義している．

#plain-box[
  実数を原点からの距離と考え，数直線上の点と同一視する．
]

　ここで1点注意しておくと，*すでに実数は有理数と無理数に分けられることは周知*としている．有理数と無理数は存在しており，これらの数が数直線上の原点$O$からの距離として数直線上の点と同一視するということになる．

=== 定義から有理数・無理数を考える．
　上の定義から，実数と数直線は同じもの（同一視する）と考えると決めた．では，この考え方に基づいて有理数と無理数はどんなものとして数直線上に存在するか見てみる．

- *有理数*：整数 $m$ と正の整数 $n$ により $m / n$ と表される実数である．数直線上では，まず単位線分 $O E$ を $n$ 等分し，その $1 / n$ の長さの線分を $O$ から $m$ 個分だけ並べる（$m < 0$ のときは負の方向へ）ことで得られる点である．つまり，有理数は「単位の長さを有限回等分割して得られる目盛り」の上に必ず乗る点といえる．

#box(width: 100%, inset: 15pt, fill: rgb("#f0fdf4"), stroke: 0.5pt + rgb("#bbf7d0"), radius: 4pt)[
  #set align(center)
  #stack(
    spacing: 1.2em,
    text(size: 0.9em, weight: "bold", fill: rgb("#166534"))[有理数の構成例：$3 / 4$],
    
    block(width: 80%)[
      // 点のラベル
      #grid(
        columns: (1fr, 1fr, 1fr, 1fr, 1fr),
        align: center,
        [$O$], [], [], [], [$E$],
        [($0$)], [$1/4$], [$2/4$], [*$3 / 4$*], [($1$)]
      )
      #v(-0.2em)
      // 軸と目盛り
      #box(width: 100%, height: 12pt)[
        #place(center + horizon, line(length: 100%, stroke: 1pt + rgb("#86efac")))
        #grid(
          columns: (1fr, 1fr, 1fr, 1fr, 1fr),
          align: center + horizon,
          box(width: 2pt, height: 10pt, fill: rgb("#166534")), // 0
          box(width: 1pt, height: 6pt, fill: rgb("#166534")),  // 1/4
          box(width: 1pt, height: 6pt, fill: rgb("#166534")),  // 2/4
          box(width: 2pt, height: 12pt, fill: rgb("#dc2626")), // 3/4 (強調)
          box(width: 2pt, height: 10pt, fill: rgb("#166534")), // 1
        )
      ]
    ],
    v(0.3em),
    text(size: 0.85em, fill: rgb("#15803d"))[単位線分 $O E$ を $n$ 等分した目盛りの上に点 $m/n$ が定まる]
  )
]
- *無理数*：$sqrt(2)$は無理数である．数直線上に存在する．$r$が有理数のとき，$r+sqrt(2)$は無理数である．$r+sqrt(2)$の形の無理数は数直線上に稠密．このことから無理数は数直線上に稠密（存在）．

　これらのことから，数直線は有理数・無理数で構成されている．言い換えると，数直線上に有理数・無理数を距離とする点が存在する．すなわち，　実数は有理数と無理数で構成されている．

=== 実数はすべて整数または小数の形で表される．
#align(center)[
  #v(0.5em)
  #block(
    width: auto,
    stroke: 0.5pt + rgb("#cbd5e1"),
    radius: 8pt,
    clip: true,
  )[
    #set text(size: 10.5pt)
    #table(
      columns: (60pt, 80pt, 80pt, 120pt, 80pt),
      align: center + horizon,
      stroke: (x, y) => (
        bottom: 0.5pt + rgb("#e2e8f0"),
        left: if x > 0 { 0.5pt + rgb("#e2e8f0") } else { none },
      ),
      inset: (y: 12pt, x: 8pt),
      fill: (x, y) => {
        if y == 0 { return rgb("#f8fafc") }
        if x == 0 { return rgb("#f1f5f9") }
        if x == 4 and y > 0 and y < 4 { return rgb("#eff6ff") } // 有理数
        if x == 4 and y == 4 { return rgb("#fff1f2") } // 無理数
      },
      
      table.header(
        table.cell(colspan: 5, stroke: (bottom: 1pt + rgb("#cbd5e1")))[
          #text(weight: "bold", fill: rgb("#334155"))[実数の分類（10進法）]
        ]
      ),
      
      // Row 1
      table.cell(rowspan: 4, text(weight: "bold")[実数]),
      [整数], 
      table.cell(colspan: 2, text(fill: gray.lighten(30%))[---]),
      table.cell(rowspan: 3, text(weight: "bold", fill: rgb("#1d4ed8"))[有理数]),
      
      // Row 2
      table.cell(rowspan: 3)[小数],
      [有限小数],
      table.cell(text(fill: gray.lighten(30%))[---]),
      
      // Row 3
      table.cell(rowspan: 2, text(size: 0.95em)[無限小数]),
      [循環小数],
      
      // Row 4
      [循環しない小数],
      table.cell(text(weight: "bold", fill: rgb("#be123c"))[無理数])
    )
  ]
  #v(0.5em)
]


　実数を10進法で表せば，上の分類となる．つまり，数直線上の実数を1つ選んだ時，それを10進法で表現できる．

=== 逆に循環しない小数は数直線上の点を表せない．
　高校数学が厳密性に欠ける点である．循環しない小数は不等式を満たす点としか表せない．例えば，$alpha = 1.010110111011110111110 dots$は
$
a_n < alpha < a_n + 1 / 10^n, quad n = 1, 2, 3, dots
$
を満たす点である．これは，$n$がどんなときも$alpha$が不等式を満たす区間の中に存在するということを意味している．特定の点を表していない．

　循環しない小数以外は上の分類をみれば有理数なので，数直線上の点を表せる．

== まとめ
- 高校数学では，実数は数直線上の点を原点からの距離と同一視して考える．
- 数直線（実数）は有理数・無理数で構成される．
- 実数を10進法で表現すると，無理数は巡回しない小数である．
    - 数直線上の無理数は循環しない小数で表現できる．
- 逆に，循環しない小数はある間隔に存在する点としてのみ表現できる．（無理数を特定できない．）
    - ここが厳密性に欠けるところである．
