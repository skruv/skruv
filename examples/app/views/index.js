import { div, h1 } from 'https://unpkg.com/skruv@0.1.5/html.js'

import Countries from '../components/Countries.js'

export default () => div({},
  h1({}, 'Countries'),
  Countries
)
