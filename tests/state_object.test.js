/* global test expect */
import { createState, htmlFactory, render } from '../index.js'
const { body, div, html } = htmlFactory
self.SkruvWaitForAsync = true

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
  expect(document.documentElement.innerHTML).toMatchSnapshot()
})
