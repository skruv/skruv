/* global test expect */
import { createState, htmlFactory, render } from '../index.js'
const { body, div, html } = htmlFactory
self.SkruvWaitForAsync = true

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
  expect(document.documentElement.innerHTML).toMatchSnapshot()
  sub.arr.push('test3')
  await wait(20)
  expect(document.documentElement.innerHTML).toMatchSnapshot()
})
