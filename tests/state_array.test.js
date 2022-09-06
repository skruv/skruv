/* global test expect */
import { createState, elements, render } from '../skruv.js'
const { body, div, html } = elements

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ arr: ['test', 'test2'] })
  await render(html({}, body({},
    async function * () {
      for await (const state of sub) {
        yield state.arr.map(a => div({}, a))
      }
    }
  )))
  expect(document.childNodes[1].childNodes[0].childNodes[0].textContent).toBe('test')
  expect(document.childNodes[1].childNodes[0].childNodes[1].textContent).toBe('test2')
  sub.arr.push('test3')
  await wait(20)
  expect(document.childNodes[1].childNodes[0].childNodes[2].textContent).toBe('test3')
})
