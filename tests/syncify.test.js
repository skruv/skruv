import assert from 'node:assert'
import test from 'node:test'

import { hydrationPromise, syncify } from '../utils/syncify.js'

const a = {
  a: new Promise(resolve => resolve('a')),
  b: async function * () {
    await new Promise(resolve => setTimeout(() => resolve(''), 5))
    yield 'b'
  },
  d: [
    () => [
      async () => [
        async function * () {
          await new Promise(resolve => setTimeout(() => resolve(''), 10))
          yield {
            a: new Promise(resolve => setTimeout(() => resolve('a'), 10))
          }
        }
      ]
    ]
  ],
  c: 'c',
  1: 1,
  arr: ['arr']
}

test('syncify', async () => {
  assert.strictEqual(syncify(a).a, undefined)
  assert.strictEqual(syncify(a).c, 'c')
  await hydrationPromise
  assert.strictEqual(syncify(a).c, 'c')
  assert.strictEqual(syncify(a).b, 'b')
  assert.strictEqual(syncify(a).d[0][0][0].a, 'a')
})
