/* global test expect */
import { createState, htmlFactory, render } from '../index.js'
const { body, div } = htmlFactory
self.SkruvWaitForAsync = true

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const state = createState({ arr: [] })

async function * generator () {
  for await (const str of state.arr) {
    yield div({}, str)
  }
}

test('update on state update: Array', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(body({}, generator), root)
  state.arr.push('test')
  await wait(20)
  return expect(html.childNodes[0].childNodes[0].textContent).toBe('test')
})
