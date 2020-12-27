import { h1, slot, css, div } from '../../../html.js'
import { stateless } from '../../../webcomponents/stateless.js'

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
