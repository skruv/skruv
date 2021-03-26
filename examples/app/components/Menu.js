import { ul, li } from 'https://unpkg.com/skruv@0.1.5/html.js'

import Link from './Link.js'

export default () => ul({},
  li({}, Link({ href: '/examples/app/' }, 'Countries')),
  li({}, Link({ href: '/examples/app/page1/exampleUser' }, 'Page 1')),
  li({}, Link({ href: '/examples/app/page2' }, 'Non-existent page'))
)
