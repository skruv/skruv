import { elements, render } from 'https://skruv.github.io/skruv/skruv.js'
const { scopedcss, html, head, meta, body, div, p } = elements

const rootStyles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`

const scopedStyles = scopedcss`
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
      title({}, 'scopedcss, HTML helpers'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      rootStyles
    ),
    body({},
      div({},
        scopedStyles,
        p({}, 'blue text')
      ),
      div({},
        p({}, 'default text')
      )
    )
  )
)