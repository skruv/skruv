/* global test expect */
import render from '../render.js'
import createState from '../createState.js'
import { body, div } from '../html.js'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ obj: {} })
  const html = document.createElement('html')
  let root = document.createElement('body')
  html.appendChild(root)
  ;(async () => {
    for await (const state of sub) {
      root = render(body({}, Object.keys(state.obj).map(key => div({ 'data-key': key }, state.obj[key]))), root)
    }
  })()
  sub.obj.test = 'testvalue'
  sub.obj.test2 = 'testvalue2'
  await wait(20)
  expect(html.childNodes[0].childNodes[0].textContent).toBe('testvalue')
  expect(html.childNodes[0].childNodes[0].getAttribute('data-key')).toBe('test')
  expect(html.childNodes[0].childNodes[1].textContent).toBe('testvalue2')
  expect(html.childNodes[0].childNodes[1].getAttribute('data-key')).toBe('test2')
})
