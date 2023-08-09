/* global Location */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import wait from '../utils/generators/waitPromise.js'

test('jsx', async () => {
  globalThis.location = new Location('http://127.0.0.1:8000/')
  // @ts-expect-error: TS thinks its not a module, because it does not have exports
  await import('../examples/jsx/index.min.js')
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html lang="en-US"><head><title>jsx</title><meta name="viewport" content="width=device-width, initial-scale=1"/><style>:root{color:#fff;background:#0f0f0f}</style></head><body><div><p>Hello world</p></div></body></html>'
  )
})
