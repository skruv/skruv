import { elements, render } from 'https://skruv.io/skruv.js'
const { css, title, html, head, meta, style, body, div, p } = elements

const rootStyles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`

const scopedStyles = css`
:scope {
  border: 1px solid;
}

p {
  color: blue;
}
`

render(
  html({ lang: 'en-US' },
    head({},
      title({}, 'scopedcss'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style({}, rootStyles)
    ),
    body({},
      div({},
        style({ scoped: true }, scopedStyles),
        p({}, 'blue text')
      ),
      div({},
        p({}, 'default text')
      )
    )
  )
)
