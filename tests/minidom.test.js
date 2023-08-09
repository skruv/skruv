/* global Location */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import wait from '../utils/generators/waitPromise.js'

test('minidom', async () => {
  // @ts-expect-error: minidom makes locations constructible
  globalThis.location = new Location('http://127.0.0.1:8000/')
  const frontend = await import('../examples/ssr/index.js')
  await frontend.default()
  await wait(1)
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html lang="en-US" class="skruv-css-scope-853650928"><head><title>Write todos</title><meta name="viewport" content="width=device-width, initial-scale=1"/><style>.skruv-css-scope-853650928 {color: #f1f1f1; background: #0f0f0f;}.skruv-css-scope-853650928 body {max-width: 40ch; margin: 0 auto;}.skruv-css-scope-853650928 form {display: flex; align-items: end;}.skruv-css-scope-853650928 label {flex: 1;}.skruv-css-scope-853650928 input {width: 100%;}.skruv-css-scope-853650928 a {color: #9b9b9b;}</style><link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any"/><meta name="description" content="Skruv todo-list"/></head><body><main><h1>Write todos</h1><form><label>What do you need to do?<input type="text" name="todo"/></label><button>New!</button></form><ol><li>Write todos <a href="#">x</a></li></ol></main></body></html>'
  )
})
