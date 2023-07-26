import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { htmlFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
globalThis.SkruvWaitForAsync = true
const { body, div, html } = htmlFactory

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
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div data-key="test">testvalue</div><div data-key="test2">testvalue2</div></body></html>'
  )
})
