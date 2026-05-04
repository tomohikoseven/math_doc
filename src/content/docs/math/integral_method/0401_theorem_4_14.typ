#import "../../../../libs/theme.typ": theme, theorem-box, circ, important-point, note-box, supplement-box, plain-box

#show: theme

#metadata((
  title: "定理4.14(定積分の積分変数の変換)",
  description: "定積分における積分変数の変換が元の定積分と同等であることを示す．",
  lastUpdated: true,
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

　この定理は，定積分の変数変換（置換積分）において，積分変数を $x$ から $t$ に変換した際，積分範囲もそれに対応して $a$ から $alpha$，$b$ から $beta$ へと適切に変更すれば，積分の値が不変であることを主張している．

具体的には，関数 $x = phi(t)$ が微分可能であり，その導関数 $phi'(t)$ が連続であるとき，
$ integral_a^b f(x) d x = integral_alpha^beta f(phi(t)) phi'(t) d t $
が成り立つというものである．ここで $a = phi(alpha)$ かつ $b = phi(beta)$ であることが重要である．


== 証明

　$f(x)$ は連続であるから，その原始関数の $1$ つを $F(x)$ とすると，微分積分学の基本定理より
$ integral_a^b f(x) d x = [F(x)]_a^b = F(b) - F(a) $
である．

　次に，合成関数 $G(t) = F(phi(t))$ を考える．合成関数の微分法（連鎖律）より
$ G'(t) = F'(phi(t)) phi'(t) = f(phi(t)) phi'(t) $
となる．したがって，$G(t)$ は被積分関数 $f(phi(t)) phi'(t)$ の原始関数の $1$ つであることがわかる．

　再び微分積分学の基本定理を適用すると，
$ integral_alpha^beta f(phi(t)) phi'(t) d t = [G(t)]_alpha^beta = G(beta) - G(alpha) $
となる．仮定より $a = phi(alpha), b = phi(beta)$ であるから，
$ G(alpha) = F(phi(alpha)) = F(a), quad G(beta) = F(phi(beta)) = F(b) $
が成り立つ．したがって，
$ integral_alpha^beta f(phi(t)) phi'(t) d t = F(b) - F(a) $
となり，式 $integral_a^b f(x) d x$ の値と一致する．

以上により，等式
$ integral_a^b f(x) d x = integral_alpha^beta f(phi(t)) phi'(t) d t $
が示された．

== 定理4.14 と 定理4.15 の違い

　定理4.14は，被積分関数 $f(x)$ が連続であり，積分範囲が有界閉区間である場合の定積分に関する変数変換の公式である．

　一方，積分範囲が無界であったり，被積分関数が区間の端で発散したりする「広義積分」の場合には，定理4.15を用いる必要がある．定理4.15では，収束性の等価性についても言及されている．

定理4.15（広義積分の積分変数の変換）についてはこちらを参照してください：
#link("/math/integral_method/0402_theorem_4_15/")[定理4.15 (積分変数の変換と広義積分の収束性および同値性)]
