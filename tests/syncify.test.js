import assert from 'node:assert'
import test from 'node:test'

import wait from '../utils/generators/waitPromise.js'
import { hydrationPromise, syncify } from '../utils/syncify.js'

const internalFunc1 = () => { }
const internalFunc2 = () => { }

const a = {
  a: new Promise(resolve => resolve('a')),
  b: async function * () {
    await wait(10)
    yield 'b'
  },
  ai: (async function * () {
    await wait(10)
    yield 'ai'
  })(),
  d: [
    () => [
      async () => [
        async function * () {
          yield {
            c: [{
              skruvFinished: false
            }]
          }
          await wait(10)
          yield {
            a: wait(10, 'a')
          }
        }
      ]
    ]
  ],
  func: async () => 'func',
  _a: internalFunc1,
  onclick: internalFunc2,
  c: 'c',
  1: 1,
  arr: ['arr'],
  f: false,
  n: null
}

test('syncify', async () => {
  assert.strictEqual(syncify(a).a, undefined)
  assert.strictEqual(syncify(a).c, 'c')
  assert.strictEqual(syncify(a).f, false)
  assert.strictEqual(syncify(a).n, null)
  assert.strictEqual(syncify(a).onclick, internalFunc2)
  await hydrationPromise
  assert.strictEqual(syncify(a).a, 'a')
  assert.strictEqual(syncify(a).c, 'c')
  assert.strictEqual(syncify(a).f, false)
  assert.strictEqual(syncify(a).n, null)
  assert.strictEqual(syncify(a).func, 'func')
  assert.strictEqual(syncify(a).onclick, internalFunc2)
  assert.strictEqual(syncify(a).b, 'b')
  assert.strictEqual(syncify(a).ai, 'ai')
  // @ts-expect-error
  assert.strictEqual(syncify(a).d[0][0][0].a, 'a')
  const newObj = {
    i: async function * () {
      let i = 0
      yield i
      while (true) {
        yield i++
      }
    }
  }
  // @ts-expect-error
  syncify(newObj).r = () => false
  await wait(1)
  assert.strictEqual(syncify(newObj).i, 0)
})
