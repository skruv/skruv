import { renderNode } from '../../vDOM.js'
import { body, div } from '../../html.js'
import { sub } from './state.js'

let root = document.body

;(async () => {
  for await (const state of sub) {
    root = await renderNode(body({
      onskruverror: (err) => {
        state.error = err
        console.error(err)
      }
    },
    state.error.msg ? div({ class: 'error' }, 'Error!') : div({},
      import('./components/componentWithLoader.js').then(i => i.default()),
      import('./components/stateSub.js').then(i => i.default())
    )
    ), root)
  }
})()
