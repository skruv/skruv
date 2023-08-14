import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
import wait from '../utils/generators/waitPromise.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
const { html, body } = elementFactory

const state = createState({ str: '' })

test('update on state update: Array', async () => {
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const currentState of state) {
              yield {
                class: currentState.str
              }
            }
          }
        )
      )
    )
  )
  await hydrationPromise
  state.str = 'test'
  await wait(1)
  assert.strictEqual(document.documentElement.children[0].getAttribute('class'), 'test')
  state.str = 'test2'
  await wait(1)
  assert.strictEqual(document.documentElement.children[0].getAttribute('class'), 'test2')
})
