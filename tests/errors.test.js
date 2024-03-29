import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
import wait from '../utils/generators/waitPromise.js'
import { HTMLElement } from '../utils/minidom.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'

const { body, div, html } = elementFactory

test('errors', async () => {
  const sub = createState({ elem: 0 })
  render(
    syncify(
      html(
        body(
          async function * () {
            try {
              yield * (async function * () {
                for await (const state of sub) {
                  if (state.elem === 0) { yield div() }
                  if (state.elem === 1) { throw new Error('Oh no') }
                }
              })()
            } catch (e) {
              if (e instanceof Error) {
                yield div({ class: 'error' }, e?.message + '!')
              }
            }
          }
        )
      )
    )
  )
  await hydrationPromise
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div></div></body></html>'
  )
  sub.elem = 1
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div class="error">Oh no!</div></body></html>'
  )
  assert.throws(() => {
    render(html(), new HTMLElement())
  })
})
