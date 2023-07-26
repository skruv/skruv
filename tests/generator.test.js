import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { htmlFactory, render } from '../index.js'
import { createState } from '../utils/state.js'
globalThis.SkruvWaitForAsync = true
const { html, body, div } = htmlFactory

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const state = createState({ arr: [] })

async function * generator () {
  for await (const str of state.arr) {
    yield div({}, str)
  }
}

test('update on state update: Array', async () => {
  render(html(body(generator)))
  state.arr.push('test')
  await wait(20)
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].textContent, 'test')
})
