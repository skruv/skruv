import { renderNode } from 'https://unpkg.com/skruv@0.1.5/vDOM.js'
import { body, div } from 'https://unpkg.com/skruv@0.1.5/html.js'

import { sub } from './state.js'
import './router.js'

let root = document.body

;(async () => {
  for await (const state of sub) {
    root = renderNode(body({
      onskruverror: (err) => {
        state.error = err
        console.error(err)
      }
    },
    state.error.msg
      ? div({ class: 'error' }, 'Error!')
      : div({},
        import(`./components/${state.pages[state.route]}`).then(i => i.default(state.routeArguments))
      )
    ), root)
  }
})()
