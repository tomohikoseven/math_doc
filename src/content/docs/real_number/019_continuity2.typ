#import "../../../libs/template.typ": template, theorem-box, circ, important-point, note-box, supplement-box
#show: template

#metadata((
  title: "実数の連続性2（定理1.6）",
  description: "小平邦彦著『解析入門Ⅰ』の定理1.6（実数の連続性）の書き起こし。実数の切断を用いた実数の連続性の証明についてまとめています。",
  lastUpdated: true,
)) <frontmatter>

#outline(title: "目次", indent: 1em)

= 実数の連続性（定理1.6）

　小平邦彦著『解析入門Ⅰ』における実数の連続性に関する定理1.6について，その証明を丁寧に解説する。

　書いていて思った．文章ばかりの証明なんて誰が見たいのだと．だが仕方ない．そういうものかなと自分を納得させる．


#theorem-box(title: [定理 1.6（実数の連続性）])[
  $chevron.l B, B' chevron.r$ を#link("/real_number/018_real_number_cut/")[実数の切断]とするとき、次のいずれか一方が必ず成り立つ。
  -  $B$ に属する最大の実数が存在する。 - #circ[①]
  -  $B'$ に属する最小の実数が存在する。 - #circ[②]
]

== 視覚的なイメージ

#box(width: 100%, inset: 10pt, fill: white, stroke: 1pt + gray.lighten(50%), radius: 4pt)[
  #set align(center)
  #stack(
    spacing: 1em,
    [実数直線上の「切断」],
    grid(
      columns: (1fr, 2pt, 1fr),
      rows: (2em, 2em),
      gutter: 0pt,
      // Labels
      align(center)[$B$ (左側)], [], align(center)[$B'$ (右側)],
      // Rectangles
      rect(width: 100%, height: 0.8em, fill: blue.lighten(80%), stroke: none),
      rect(width: 100%, height: 2em, fill: black, stroke: none), // Boundary
      rect(width: 100%, height: 0.8em, fill: orange.lighten(80%), stroke: none),
    ),
    [境界点 $alpha$ が $B$ の「右端(最大)」か、$B'$ の「左端(最小)」のどちらかになる]
  )
]

== 証明
　（そのままだとちゃんとした数学的な証明になっていないので注意してね．）

=== 実数の切断は実数である．
　$chevron.l B,B' chevron.r$ は実数の切断であって，まだ何者なのかわからない．つまり，実数直線上にはすき間があって，それを埋める何かかもしれない．ただここでは#circ[①②] のいずれかであることを示すので，最大なり最小なりの実数になりえるものを構成する．実数の切断があり，切断箇所に示したい実数があると思う．よって，
$
A = B inter QQ, quad A' = B' inter QQ, quad alpha = chevron.l A, A' chevron.r
$
とおく．

　注意したいのは，$alpha = chevron.l A, A' chevron.r$ はまだ#link("/real_number/010_dedekind_cut/")[有理数の切断]かわかっていないことだ．具体的に言うと，$A$ に最大の有理数がないかわかっていない．なぜなら，それは実数の切断 $chevron.l B, B' chevron.r$ から構成したからだ．

　$ alpha = chevron.l A, A' chevron.r$ が実は実数であることを示す．

　$A$ に属する最大の有理数$a$があるとする．すると，$A = B inter QQ$ だったので，$a$ は $B$ に属する最大の有理数である．$a$ は実数でもあるから，$B$上で考えると，$a < rho quad rho in B$ なる実数$rho$ があるとすれば，#link("/real_number/014_consistency/")[定理1.4]より，$a < r < rho$ なる有理数$r$がとれる．（実数$rho$ は有理数とは限らない．無理数とすれば，$a < rho$ なるものは存在する．）つまり，$a < r$ なる有理数$r$がとれる．有理数$a$ より大きい$A$ に属する有理数$r$が存在したので，矛盾が生じた．つまり，$A$ に属する最大の有理数$a$は存在しない．

　実数の切断$chevron.l B, B' chevron.r$の切断面が有理数であり，それが$B$に属するとき，上の論理は成り立たない．$a < rho quad rho in B$なる実数$rho$はないからである．なので，このときは切断面の有理数は$B'$に属すると考える（つまり，切断面が有理数なら，この有理数は$B'$に属するものと初めから考える）．実数の切断の定義上も問題ない．すると，$A$に属する最大の有理数$a$は切断面の点ではなくなり，上の論理が成り立ち，$A$に属する最大の有理数$a$は存在しない．

　$A$ に属する最大の有理数はないものとする．すると$alpha = chevron.l A, A' chevron.r$は有理数の切断であり，実数である．

=== $alpha$ は$B$の最大もしくは$B'$の最小である．
　$alpha$ は実数であることがわかったので，$alpha in B$ もしくは $alpha in B'$ である．なぜなら，$alpha in B$ かつ $alpha in B'$だとすると，実数の切断の定義から，$alpha < alpha$になるので矛盾する．よって，$alpha in B $ かもしくは $alpha in B'$しかありえない．

　$alpha in B$とする．このとき，$alpha$は$B$の最大である．なぜなら，もし$alpha$が$B$の最大でないとすると，$alpha < rho$なる$rho in B$が存在する．この実数$rho$に対して，$alpha < r < rho$なる有理数$r in B$がとれる．このとき，$r in A$である．しかし，#link("/real_number/013_theorem1-3/")[定理1.3]より，$alpha = chevron.l A, A' chevron.r$において，$alpha < r$なる有理数$r$は$r in A'$のはず．矛盾が生じた．したがって，$alpha$は$B$の最大である．

　同様に$alpha in B'$とすれば，$alpha$は$B'$の最小である．

　以上により，#circ[①②]が示せた．

== なぜ連続であると言えるのか．
　この定理1.6が主張することは，数直線を切断した点が$B$(切断左の集合)に属するときはその点は$B$の最大である，もしくは$B'$(切断右の集合)に属するときはその点は$B'$の最小であるということである．つまり，数直線を切断した点が$B$の最大もしくは$B'$の最小であるということである．これは別の言い方をすれば，切断した点は$B$と$B'$の境目ということである．すなわち：
$
rho in B, quad sigma in B' "ならば" rho <= alpha <= sigma
$
を満たす実数$alpha$が存在する．これが連続であるということである．