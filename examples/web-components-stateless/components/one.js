import { h1, link, slot } from '../../../html.js'
import { stateless } from '../../../webcomponents/stateless.js'

export default () => () => slot({},
  stateless(
    'test',
    {},
    () => slot({ name: 'root' }, [
      h1({}, 'Testing!'),
      link({ rel: 'stylesheet', href: './h1.css' })
    ])
  )
)
