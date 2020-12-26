/* global test expect */
import { renderNode } from '../vDOM.js'
import { createState } from '../state.js'
import { body, div } from '../html.js'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const state = createState({ arr: [] })

async function * generator () {
  for await (const str of state.arr) {
    yield div({}, str)
  }
}

test('use slots as placeholders', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  renderNode(body({}, generator), root)
  return expect(html.childNodes[0].childNodes[0].nodeName).toBe('SLOT')
})

test('update on state update: Array', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  renderNode(body({}, generator), root)
  state.arr.push('test')
  await wait(1)
  return expect(html.childNodes[0].childNodes[0].textContent).toBe('test')
})
