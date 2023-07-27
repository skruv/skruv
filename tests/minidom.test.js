import assert from 'node:assert'
import test from 'node:test'

import { toHTML } from '../utils/minidom.js'

test('minidom', async () => {
  globalThis.location = new URL('http://127.0.0.1:8000/')
  globalThis.SkruvWaitForAsync = true
  const frontend = await import('../examples/ssr/index.min.js')
  await frontend.doRender()

  // TODO: Check why we need a microsleep here
  await new Promise(resolve => setTimeout(resolve, 0))

  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  assert.strictEqual(
    responseBody,
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html lang="en-US" class="skruv-css-scope-1582337948"><head><title>Write todos</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><style>.skruv-css-scope-1582337948 {color: #f1f1f1; background: #0f0f0f;}.skruv-css-scope-1582337948 body {max-width: 40ch; margin: 0 auto;}.skruv-css-scope-1582337948 form {display: flex;}.skruv-css-scope-1582337948 input {flex: 1;}</style></head><body><main><h1>Write todos</h1><form><input type="text" name="todo"></input><button>New!</button></form><ol><li>Write todos <a href="#">x</a></li></ol></main></body></html>'
  )
})
