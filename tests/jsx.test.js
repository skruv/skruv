import assert from 'node:assert'
import test from 'node:test'

import { toHTML } from '../utils/minidom.js'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

test('jsx', async () => {
  globalThis.location = new URL('http://127.0.0.1:8000/')
  await import('../examples/jsx/index.min.js')
  await wait(1)

  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  assert.strictEqual(
    responseBody,
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html lang="en-US"><head><title>jsx</title><meta name="viewport" content="width=device-width, initial-scale=1"/><style>:root{color:#fff;background:#0f0f0f}</style></head><body><div><p>Hello world</p></div></body></html>'
  )
})
