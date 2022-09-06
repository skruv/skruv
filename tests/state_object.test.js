/* global test expect */
import { createState, elements, render } from '../skruv.js'
const { body, div, html } = elements

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ obj: {} })
  await render(html({}, body({},
    async function * () {
      for await (const state of sub) {
        yield Object.keys(state.obj).map(key => div({ 'data-key': key }, state.obj[key]))
      }
    }
  )))
  sub.obj.test = 'testvalue'
  sub.obj.test2 = 'testvalue2'
  await wait(20)
  expect(document.childNodes[1].childNodes[0].childNodes[0].textContent).toBe('testvalue')
  expect(document.childNodes[1].childNodes[0].childNodes[0].getAttribute('data-key')).toBe('test')
  expect(document.childNodes[1].childNodes[0].childNodes[1].textContent).toBe('testvalue2')
  expect(document.childNodes[1].childNodes[0].childNodes[1].getAttribute('data-key')).toBe('test2')
})
