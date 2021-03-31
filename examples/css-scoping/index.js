import { renderNode } from 'https://unpkg.com/skruv@0.2.0/vDOM.js'
import { body, div, css, section } from 'https://unpkg.com/skruv@0.2.0/html.js'

const globalStyle = css`
:root {
  --size: 1.5rem;
}

div {
  color:green
}
`

const localStyle = css`
div {
  color:red;
  font-size: var(--size)
}
`

renderNode(
  body({},
    div({}, 'global'),
    section({ 'data-shadowed': true }, div({}, 'local', localStyle)),
    globalStyle
  ),
  document.body
)
