import { h1, link, slot } from 'https://unpkg.com/skruv@0.0.7-1/html.js'
import { stateless } from 'https://unpkg.com/skruv@0.0.7-1/webcomponents/stateless.js'

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
