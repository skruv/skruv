import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
import { syncify } from '../utils/syncify.js'
globalThis.SkruvWaitForAsync = true
const { html, body, div } = elementFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const state = createState({ str: '' })

test('update on state update: Array', async () => {
  render(
    syncify(
      html(
        body(
          async function* () {
            for await (const currentState of state) {
              yield div(currentState.str)
            }
          }
        )
      )
    )
  )
  state.str = 'test'
  await wait(1)
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].textContent, 'test')
  state.str = 'test2'
  await wait(1)
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].textContent, 'test2')
})
