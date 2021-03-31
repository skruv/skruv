import { div, h1 } from 'https://unpkg.com/skruv@0.2.0/html.js'

import Link from './Link.js'

export default () => div({},
  h1({}, 'Page 1'),
  Link({ href: '/examples/routing/' }, 'Back to index')
)
