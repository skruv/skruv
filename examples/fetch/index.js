import { renderNode } from 'https://unpkg.com/skruv@0.2.0/vDOM.js'
import { body } from 'https://unpkg.com/skruv@0.2.0/html.js'

import componentWithLoader from './components/componentWithLoader.js'

renderNode(
  body({
    onskruverror: (err) => {
      console.error(err)
    }
  }, componentWithLoader),
  document.body
)
