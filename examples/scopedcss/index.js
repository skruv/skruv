import { css, cssElement, htmlFactory, render } from 'https://skruv.io/index.js'

const { title, html, head, meta, body, div, p } = htmlFactory

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
  html({ lang: 'en-US', class: rootStyles },
    head(
      title('scopedcss'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      cssElement
    ),
    body(
      div({ class: scopedStyles },
        p('blue text')
      ),
      div(
        p('default text')
      )
    )
  )
)
