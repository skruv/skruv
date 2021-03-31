import { renderNode } from 'https://unpkg.com/skruv@0.2.0/vDOM.js'
import { body, div } from 'https://unpkg.com/skruv@0.2.0/html.js'
import { createState } from 'https://unpkg.com/skruv@0.2.0/state.js'

// Create a new state object with the current time
export const sub = createState({
  date: new Date()
})

// Each second update the time
setInterval(() => { sub.date = new Date() }, 1000)

const formater = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' })

let root = document.body

;(async () => {
  // When state changes, rerender the HTML
  for await (const state of sub) {
    root = renderNode(
      body({},
        div({}, formater.format(state.date))
      ),
      root
    )
  }
})()
