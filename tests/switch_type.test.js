import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import wait from '../utils/generators/waitPromise.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'

const { body, div, html, hr } = elementFactory

test('switch type', async () => {
  const sub = createState({ elem: 0 })
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const state of sub) {
              if (state.elem === 0) { yield hr() }
              if (state.elem === 1) { yield [div({ 'data-test': 'hello' }), div()] }
              if (state.elem === 2) { yield [div({ 'data-test': false })] }
              if (state.elem === 3) { yield [] }
            }
          }
        )
      )
    )
  )
  await hydrationPromise
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><hr/></body></html>'
  )
  // @ts-ignore: SKRUV_1
  sub.elem = 1
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div data-test="hello"></div><div></div></body></html>'
  )
  // @ts-ignore: SKRUV_1
  sub.elem = 2
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div></div></body></html>'
  )
  // @ts-ignore: SKRUV_1
  sub.elem = 3
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body></body></html>'
  )
})
