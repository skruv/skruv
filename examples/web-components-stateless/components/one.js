import { h1, slot, css } from 'https://unpkg.com/skruv@0.0.11/html.js'
import { stateless } from 'https://unpkg.com/skruv@0.0.11/webcomponents/stateless.js'

const style = css`
h1 {
  color: pink;
}
`

export default () => () => slot({},
  stateless(
    'test',
    {},
    () => slot({ name: 'root' }, [
      h1({}, 'Testing!'),
      style
    ])
  )
)
