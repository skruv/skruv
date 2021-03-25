import { renderNode } from 'https://unpkg.com/skruv@0.1.5/vDOM.js'
import { body, div, progress } from 'https://unpkg.com/skruv@0.1.5/html.js'

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

const formater = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' })

async function * Timer () {
  yield progress()
  while (true) {
    await wait(1000)
    yield div({}, formater.format(new Date()))
  }
}

renderNode(
  body({}, Timer),
  document.body
)
