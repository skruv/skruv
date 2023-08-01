import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import wait from '../utils/generators/waitPromise.js'
import { HTMLElement } from '../utils/minidom.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
const { html, body, div } = elementFactory

const state = createState({ str: '' })

let elem = new HTMLElement()

test('update on state update: Array', async () => {
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const currentState of state) {
              yield div({
                oncreate: (/** @type {HTMLElement} */ e) => { elem = e }
              }, currentState.str)
            }
          }
        )
      )
    )
  )
  await hydrationPromise
  // @ts-ignore: SKRUV_1
  state.str = 'test'
  await wait(1)
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].textContent, 'test')
  // @ts-ignore: SKRUV_1
  state.str = 'test2'
  await wait(1)
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].textContent, 'test2')
  assert.strictEqual(elem.nodeName, 'div')
})
