import { htmlFactory, render } from '../../index.js'
import { css, cssTextGenerator } from '../../utils/css.js'

const { title, html, head, meta, body, div, p, style } = htmlFactory

const rootStyles = css`
:scope {
  color: #f1f1f1;
  background: #0f0f0f;
}
`

const scopedStyles = css`
:scope {
  border: 1px solid #aaa;
}

p {
  color: #aaa;
}
`

export const doRender = () => render(
  html({ lang: 'en-US', class: rootStyles },
    head(
      title('scopedcss'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator)
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

doRender()
