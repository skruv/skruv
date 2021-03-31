import { div, h1, h2 } from 'https://unpkg.com/skruv@0.2.0/html.js'

import Link from './Link.js'

export default (args) => div({},
  h1({}, 'Page 2'),
  h2({}, `Hello ${args.name}`),
  Link({ href: '/examples/routing/' }, 'Back to index')
)
