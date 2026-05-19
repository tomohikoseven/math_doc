#import "/libs/fletcher/src/exports.typ" as fletcher: diagram, node, edge

#set page(width: auto, height: auto, margin: 10pt)

#align(center)[
  #diagram(
    spacing: (80pt, 50pt),
    node-stroke: 0.6pt,
    
    // Nodes
    node((0, 0), [関数の極限]),
    node((1, 0), [関数の連続性]),
    node((0, 1), [微分 \ =分数の極限]),
    node((1, 1), [グラフの形の近似]),
    node((0, 2), [微分可能性 \ =形の判定 \ （なめらか，角ばった）]),
    
    // Edges
    edge((0, 0), (1, 0), "-"),
    edge((0, 0), (0, 1), "-|>", label: [分数の形], label-side: left),
    edge((0, 1), (1, 1), "-"),
    edge((0, 1), (0, 2), "-|>", label: [微分の連続性], label-side: left),
  )
]
