/* global test expect */
import render from '../render.js'
import createState from '../createState.js'
import { body, div } from '../elements.js'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ arr: [] })
  const html = document.createElement('html')
  let root = document.createElement('body')
  html.appendChild(root)
  ;(async () => {
    for await (const state of sub) {
      root = render(body({}, state.arr.map(a => div({}, a))), root)
    }
  })()
  sub.arr.push('test')
  sub.arr.push('test2')
  await wait(20)
  expect(html.childNodes[0].childNodes[0].textContent).toBe('test')
  expect(html.childNodes[0].childNodes[1].textContent).toBe('test2')
})
