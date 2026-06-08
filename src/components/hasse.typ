#import "/libs/cetz/src/lib.typ": canvas, draw

#let hasse-diamond(top, left, right, bottom) = align(center)[
  #canvas({
    import draw: *
    let node-style = (radius: 0.1, fill: black)
    
    circle((0, 2), name: "top", ..node-style)
    content((0.4, 2), top, size: 10pt)
    
    circle((-1, 1), name: "left", ..node-style)
    content((-1.4, 1), left, size: 10pt)
    
    circle((1, 1), name: "right", ..node-style)
    content((1.4, 1), right, size: 10pt)
    
    circle((0, 0), name: "bottom", ..node-style)
    content((0.4, 0), bottom, size: 10pt)
    
    line("top", "left", stroke: 0.7pt)
    line("top", "right", stroke: 0.7pt)
    line("left", "bottom", stroke: 0.7pt)
    line("right", "bottom", stroke: 0.7pt)
  })
]
