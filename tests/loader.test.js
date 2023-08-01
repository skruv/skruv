import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import addLoader from '../utils/generators/addLoader.js'
import wait from '../utils/generators/waitPromise.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'

const { body, div, html } = elementFactory

test('switch type', async () => {
  render(
    syncify(
      html(
        body(
          addLoader(
            async function * () {
              await wait(500)
              yield div('finished!')
            },
            div({ 'data-skruv-finished': false }, 'Loading content')
          )
        )
      )
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body></body></html>'
  )
  await wait(400)
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div>Loading content</div></body></html>'
  )
  await hydrationPromise
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div>finished!</div></body></html>'
  )
})
