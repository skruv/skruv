/* global fetch */
import { div, progress, ul, li } from 'https://unpkg.com/skruv@0.1.5/html.js'

async function * componentWithLoader () {
  yield progress()

  const result = await fetch('/examples/fetch/example.json', {
    accept: 'application/json'
  }).then(res => res.json())

  yield ul({}, result.map(weekday => li({}, weekday)))
}

export default div({}, componentWithLoader)
