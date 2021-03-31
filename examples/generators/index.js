import { renderNode } from 'https://unpkg.com/skruv@0.2.0/vDOM.js'
import { body, div, progress } from 'https://unpkg.com/skruv@0.2.0/html.js'

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

let count = 0

async function * Timer () {
  yield progress()
  while (true) {
    await wait(1000)
    count++
    yield div({}, count)
  }
}

renderNode(
  body({}, Timer),
  document.body
)
