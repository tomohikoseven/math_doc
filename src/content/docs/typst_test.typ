#import "../../libs/template.typ": template
#show: template

#metadata((
  title: "Typst Test",
  description: "Typst testing in Starlight"
)) <frontmatter>

= Typst Test

This is a test of Typst integration in Starlight.

== Math

$ integral_a^b f(x) dif x $

== Grid

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  rect(fill: blue.lighten(80%), stroke: blue)[Column 1],
  rect(fill: red.lighten(80%), stroke: red)[Column 2]
)
