#import "../../../../libs/theme.typ": theme, theorem-box, circ, important-point, note-box, supplement-box, plain-box
#show: theme
#set math.equation(supplement: [式])

#metadata((
  title: "定理4.15(積分変数の変換と広義積分の収束性および同値性)",
  description: "積分変数の変換と広義積分の収束性が同じであり，その極限値も同じであることを示す．",
  lastUpdated: true,
)) <frontmatter>

　広義積分における変数変換（置換積分）の公式を与える定理である。関数 $x = phi(t)$ によって、広義積分の積分変数を $x$ から $t$ へと変換し、対応する積分範囲で計算できることを示している。

#theorem-box(title: "定理4.15")[
　$f(x)$は開区間 $(a,b)$ で連続な $x$ の関数，$phi(t)$は $(alpha,beta)$ で連続微分可能な $t$ の関数で，$alpha < t < beta $ のとき $a < phi(t) < b$，$a = limits(lim)_(t -> alpha+0) phi(t), b= limits(lim)_(t -> beta-0) phi(t)$ であると仮定する．
この仮定のもとで，広義積分$display(integral_a^b f(x) d x)$が収束するための必要かつ十分な条件は広義積分$display(integral_alpha^beta f(phi(t)) phi'(t) d t)$が収束することであって，収束するときには等式：

$ integral_a^b f(x) d x = integral_alpha^beta f(phi(t)) phi'(t) d t $

が成り立つ．
]

== 定理の主張
　この定理の主張は2つある．

1. $display(integral_a^b f(x) d x)$が収束するときは，$display(integral_alpha^beta f(phi(t)) phi'(t) d t)$も収束し，その逆も成り立つ．つまり，この2つの広義積分の収束性は等価である．
2. $display(integral_a^b f(x) d x) = display(integral_alpha^beta f(phi(t)) phi'(t) d t)$である．1.で収束性の等価を主張しているが，その極限値が常に同じであるとは言っていない．そこでこの2.で極限値が常に同じであることを主張している．


== 証明

　まず、任意の $[c, d] subset (a, b)$ に対して、$f(x)$ は連続なので定積分 $integral_c^d f(x) d x$ が存在する。これに対応する $(alpha, beta)$ 内の区間を $[gamma, delta]$ （すなわち $phi(gamma) = c, phi(delta) = d$）とすると、通常の定積分の置換積分公式より、次が成り立つ：
#math.equation(block: true, numbering: "(1)", $
  integral_c^d f(x) d x = integral_gamma^delta f(phi(t)) phi'(t) d t
$) <eq_substitution>
　ここで、ある一点 $x_0 in (a, b)$ と $t_0 in (alpha, beta)$ を、$x_0 = phi(t_0)$ となるように固定する。原始関数に相当する関数をそれぞれ次のように置く：
$ F(x) = integral_(x_0)^x f(u) d u, quad G(t) = integral_(t_0)^t f(phi(v)) phi'(v) d v $
 式(1) より、$F(phi(t)) = G(t)$ がすべての $t in (alpha, beta)$ で成り立つ。

=== 1. 収束性の等価性
　広義積分 $integral_a^b f(x) d x$ が収束するための必要十分条件は、定義により極限 $limits(lim)_(x -> b-0) F(x)$ および $limits(lim)_(x -> a+0) F(x)$ が存在することである。

==== (i) 必要条件：$integral_a^b f(x) d x$ が収束すれば、$integral_alpha^beta f(phi(t)) phi'(t) d t$ も収束する。
　仮定より $limits(lim)_(t -> beta-0) phi(t) = b$ かつ $phi(t)$ は連続なので、$t -> beta-0$ のとき $phi(t) -> b-0$ となる。合成関数の極限の性質により、
$ limits(lim)_(t -> beta-0) G(t) = limits(lim)_(t -> beta-0) F(phi(t)) = limits(lim)_(x -> b-0) F(x) $
であり、右辺が存在するならば左辺も存在する。下端についても同様に $limits(lim)_(t -> alpha+0) G(t) = limits(lim)_(x -> a+0) F(x)$ が成り立つため、必要条件が示された。

==== (ii) 十分条件：$integral_alpha^beta f(phi(t)) phi'(t) d t$ が収束すれば、$integral_a^b f(x) d x$ も収束する。
　$phi(t)$ は $(alpha, beta)$ から $(a, b)$ への連続微分可能な関数であり、その像は $(a, b)$ 全体にわたる。十分条件を示すには、$x$ が $a$ または $b$ に近づくときに $F(x)$ が収束することを確認すればよい。$F(x) = G(phi^(-1)(x))$ と考えれば（$phi$ が狭義単調であることを考慮すると）、
$ limits(lim)_(x -> b-0) F(x) = limits(lim)_(t -> beta-0) G(t) $
が成り立ち、右辺が存在するならば左辺も存在する。下端も同様である。

　以上 (i), (ii) より、収束性の等価性が示された。

=== 2. 極限値の等号
　双方が収束する場合、その値は次の極限で与えられる：
$ integral_a^b f(x) d x &= limits(lim)_(x_2 -> b-0) integral_(x_0)^(x_2) f(x) d x - limits(lim)_(x_1 -> a+0) integral_(x_0)^(x_1) f(x) d x \
&= limits(lim)_(t_2 -> beta-0) integral_(t_0)^(t_2) f(phi(t)) phi'(t) d t - limits(lim)_(t_1 -> alpha+0) integral_(t_0)^(t_1) f(phi(t)) phi'(t) d t \
&= integral_alpha^beta f(phi(t)) phi'(t) d t $
　以上により、等式が成り立つことが示された。

== 定理4.14 と 定理4.15 の違い
　定理4.14と定理4.15は、どちらも積分変数の変換に関する定理であるが、その主張が異なる．

- 定理4.14は、積分変数の変換と定積分は等価であることを示す．
- 定理4.15は、*区間の端が不連続な点な場合でも*、積分変数の変換と広義積分の収束性が同じであり，その極限値も同じであることを示す．

定理4.14（定積分の積分変数の変換）についてはこちらを参照してください：
#link("/math/integral_method/0401_theorem_4_14/")[定理4.14 (定積分の積分変数の変換)]
