import assert from 'node:assert'
import test from 'node:test'

import { toHTML } from '../utils/minidom.js'

test('css', async () => {
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
    '<!DOCTYPE html><html lang="en-US" class="skruv-css-scope-1837023110"><head><title>Write todos</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><style>.skruv-css-scope-1837023110 :root {font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,segoe ui,helvetica neue,helvetica,Cantarell,Ubuntu,roboto,noto,arial,sans-serif;}.skruv-css-scope-1837023110 body {max-width: 40ch; margin: 0 auto;}.skruv-css-scope-1837023110 form {display: flex;}.skruv-css-scope-1837023110 input {flex: 1;}</style></head><body><main><h1>Write todos</h1><form><input type="text" name="todo"></input><button>New!</button></form><ol><li>Write todos <a href="#">x</a></li></ol></main></body></html>'
  )
})
