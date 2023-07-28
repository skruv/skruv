import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
globalThis.SkruvWaitForAsync = true
const { body, div, html } = elementFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on object modify', async () => {
  const sub = createState({ obj: {} })
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const state of sub) {
              yield Object.keys(state.obj).map(key => div({ 'data-key': key }, state.obj[key]))
            }
          }
        )
      )
    )
  )
  await hydrationPromise
  sub.obj.test = 'testvalue'
  sub.obj.test2 = 'testvalue2'
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div data-key="test">testvalue</div><div data-key="test2">testvalue2</div></body></html>'
  )
})
