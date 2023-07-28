import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
import { syncify, hydrationPromise } from '../utils/syncify.js'
globalThis.SkruvWaitForAsync = true
const { body, div, html } = elementFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on object modify', async () => {
  const sub = createState({ obj: {} })
  const app = html(
    body(
      async function * () {
        for await (const state of sub) {
          yield Object.keys(state.obj).map(key => div({ 'data-key': key }, state.obj[key]))
        }
      }
    )
  )
  syncify(app)
  await hydrationPromise
  // TODO; Fix? It seems like the  hydrationpromise does not work
  console.log(JSON.stringify(syncify(app), null, 4))
  await wait(1)
  render(syncify(app))
  sub.obj.test = 'testvalue'
  sub.obj.test2 = 'testvalue2'
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div data-key="test">testvalue</div><div data-key="test2">testvalue2</div></body></html>'
  )
})
