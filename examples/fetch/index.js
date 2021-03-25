import { renderNode } from 'https://unpkg.com/skruv@0.1.5/vDOM.js'
import { body } from 'https://unpkg.com/skruv@0.1.5/html.js'
import { createState } from 'https://unpkg.com/skruv@0.1.5/state.js'

import componentWithLoader from './components/componentWithLoader.js'

let root = document.body
export const sub = createState({
  error: {}
})

;(async () => {
  root = renderNode(body({
    onskruverror: (err) => {
      sub.error = err
      console.error(err)
    }
  },
  componentWithLoader
  ), root)
})()
