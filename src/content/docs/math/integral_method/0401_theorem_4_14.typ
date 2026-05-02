#import "../../../../libs/theme.typ": theme, theorem-box, circ, important-point, note-box, supplement-box, plain-box

#show: theme

#metadata((
  title: "定理4.14(定積分の積分変数の変換)",
  description: "定積分における積分変数の変換が元の定積分と同等であることを示す．",
  lastUpdated: true,
  draft: true,
)) <frontmatter>

　定積分における変数変換（置換積分）の公式を与える定理である。関数 $x = phi(t)$ によって、定積分の積分変数を $x$ から $t$ へと変換し、対応する積分範囲で計算できることを示している。

#theorem-box(title: "定理4.14")[
    $alpha, beta, alpha != beta, $ を$J$に属する2点とし，$a = phi(alpha), b = phi(beta)$ とおけば，
    $ integral_a^b f(x) d x = integral_alpha^beta f(phi(t)) phi'(t) d t $
]

　$f(x)$ をある区間$I$で連続な $x$ の関数，$phi(t)$ を区間$J$ で定義された連続微分可能な $t$ の関数とし，$phi$ の値域 $phi(J)$ が $I$ に含まれているとして，$f$ と $phi$ の合成関数 $f(phi(t))$ を考察する．仮定により，$phi(t)$ の導関数 $phi'(t)$ は $t$ の連続関数である．

#let domain-axis(name, length, width: 60pt, points: ()) = {
  grid(columns: 1, gutter: 8pt, align: center,
    name,
    box(width: width, height: length)[
      #place(top + left, dx: 20pt)[#line(start: (0pt, 0pt), end: (0pt, length), stroke: 0.5pt + gray)]
      #for p-info in points {
        let p = p-info.at(0)
        let label = p-info.at(1)
        place(top + left, dx: 20pt - 2.5pt, dy: p * length - 2.5pt)[#circle(radius: 2.5pt, fill: black)]
        place(top + left, dx: 28pt, dy: p * length - 0.5em)[#label]
      }
    ]
  )
}

#v(1em)
#align(center)[
  #grid(
    columns: (auto, 40pt, auto, 40pt, auto),
    align: horizon,
    // J軸: デフォルトの幅 60pt
    domain-axis($J$, 100pt, points: ((0.2, $alpha$), (0.8, $beta$))),
    [$phi$ #sym.arrow.r],
    // 中央軸: ラベルが長いため幅 130pt を指定
    domain-axis($phi(J) subset I$, 140pt, width: 100pt, points: ((0.3, $a=phi(alpha)$), (0.75, $b=phi(beta)$))),
    [$f$ #sym.arrow.r],
    // f(I)軸: ラベルがないので幅 40pt
    domain-axis($f(I)$, 80pt, width: 40pt)
  )
]
#v(1em)


== 定理の主張
