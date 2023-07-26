import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { htmlFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
globalThis.SkruvWaitForAsync = true
const { body, div, html } = htmlFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('update on array push', async () => {
  const sub = createState({ arr: ['test', 'test2'] })
  await render(html(body(
    async function * () {
      for await (const state of sub) {
        yield state.arr.map(a => div(a))
      }
    }
  )))
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body></body></html>')
  sub.arr.push('test3')
  await wait(20)
  assert.strictEqual(document.documentElement.innerHTML, '<!DOCTYPE html><html><body><div>test</div><div>test2</div><div>test3</div></body></html>')
})
