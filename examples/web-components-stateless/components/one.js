import { h1, css, div } from 'https://unpkg.com/skruv@0.1.0/html.js'
import { stateless } from 'https://unpkg.com/skruv@0.1.0/webcomponents/stateless.js'

const style = css`
h1 {
  color: pink;
}
`

export default () => stateless(
  'test',
  {},
  () => div({}, [
    h1({}, 'Testing!'),
    style
  ])
)
