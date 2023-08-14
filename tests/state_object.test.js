import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
import wait from '../utils/generators/waitPromise.js'
import { createState } from '../utils/state.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'
const { body, div, html } = elementFactory

test('update on object modify', async () => {
  /** @type {{obj: Record<string, string>}} */
  const state = { obj: {} }
  const sub = createState(state)
  render(
    syncify(
      html(
        body(
          async function * () {
            for await (const state of sub) {
              yield Object.keys(state.obj).map(key => div(state.obj[key]))
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
    '<!DOCTYPE html><html><body><div>testvalue</div><div>testvalue2</div></body></html>'
  )
  sub.obj = { test3: 'testvalue3' }
  // @ts-expect-error: SKRUV_1
  sub.obj2 = { test3: 'testvalue3' }
  assert.deepEqual(sub.toJSON, { obj: { test3: 'testvalue3' }, obj2: { test3: 'testvalue3' } })

  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div>testvalue3</div></body></html>'
  )
})
