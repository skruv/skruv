import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
import addLoader from '../utils/generators/addLoader.js'
import wait from '../utils/generators/waitPromise.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'

const { body, div, html } = elementFactory

test('loader', async () => {
  render(
    syncify(
      html(
        body(
          addLoader(
            async function * () {
              await wait(500)
              yield div('finished!')
            },
            div({ skruvFinished: false }, 'Loading content')
          )
        )
      )
    )
  )
  await hydrationPromise
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><div>finished!</div></body></html>'
  )
})
