import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import wait from '../utils/generators/waitPromise.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
const { body, div, html } = elementFactory

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
  // @ts-ignore: SKRUV_1
  sub.arr = ['test4']
  await wait(1)
  let i = 0;
  (async () => {
    for await (const value of sub.arr.getGenerator(0)) {
      if (i === 0) { assert.strictEqual(value, 'test4') }
      // @ts-ignore: SKRUV_1
      sub.arr = ['test5']
      if (i === 1) {
        assert.strictEqual(value, 'test5')
        break
      }
      i++
    }
  })()
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body><div>test4</div></body></html>')
  assert.deepEqual(sub.toJSON, { arr: ['test4'] })
  // @ts-ignore: SKRUV_1
  delete sub.arr
  assert.deepEqual(sub.toJSON, {})
  // @ts-ignore: SKRUV_1
  sub.newValue = new URL('https://skruv.io')
  i = 0;
  (async () => {
    for await (const value of sub.getGenerator('newValue')) {
      if (i === 0) { assert.strictEqual(value.href, 'https://skruv.io/') }
      // @ts-ignore: SKRUV_1
      value.pathname = '/test'
      if (i === 1) {
        assert.strictEqual(value.href, 'https://skruv.io/test')
        break
      }
      i++
    }
  })()
})
