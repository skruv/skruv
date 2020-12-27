import { renderNode } from '../../vDOM.js'
import { body, div, foreignObject, svg, css, polygon } from '../../html.js'

// Example taken from mdn: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject

let root = document.body
const style = css`
div {
  height: 100%;
  overflow: auto;
  font: 18px serif;
  color: white;
}
`

;(async () => {
  root = await renderNode(body({},
    svg({ viewBox: '0 0 200 200', width: '200', height: '200', xmlns: 'http://www.w3.org/2000/svg' },
      style,
      polygon({ points: '5,5 195,10 185,185 10,195' }),
      foreignObject({ x: '20', y: '20', width: '160', height: '160' },
        div({},
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed mollis mollis mi ut ultricies. Nullam magna ipsum,
          porta vel dui convallis, rutrum imperdiet eros. Aliquam
          erat volutpat.`
        )
      )
    )), root)
})()
