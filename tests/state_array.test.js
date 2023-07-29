import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
const { body, div, html } = elementFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ arr: ['test', 'test2'] })
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const state of sub) {
              yield state.arr.map(a => div(a))
            }
          }
        )
      )
    )
  )
  // First render should not wait for async stuff
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body></body></html>')
  // Wait for async stuff
  await hydrationPromise
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body><div>test</div><div>test2</div></body></html>')
  sub.arr.push('test3')
  await wait(1)
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body><div>test</div><div>test2</div><div>test3</div></body></html>')
})
