import { div, h1 } from 'https://unpkg.com/skruv@0.1.5/html.js'

import Link from './Link.js'

export default (args) => div({},
  h1({}, '404 - Could not find page!'),
  Link({ href: '/examples/routing/' }, 'Back to index')
)
