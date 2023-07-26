import assert from 'node:assert'
import test from 'node:test'

import { hydrationPromise, syncify } from '../utils/syncify.js'

const internalFunc1 = () => { }
const internalFunc2 = () => { }

const a = {
  a: new Promise(resolve => resolve('a')),
  b: async function * () {
    await new Promise(resolve => setTimeout(() => resolve(''), 5))
    yield 'b'
  },
  ai: (async function * () {
    await new Promise(resolve => setTimeout(() => resolve(''), 10))
    yield 'ai'
  })(),
  d: [
    () => [
      async () => [
        async function * () {
          yield {
            a: {
              'data-skruv-finished': false
            }
          }
          await new Promise(resolve => setTimeout(() => resolve(''), 10))
          yield {
            a: new Promise(resolve => setTimeout(() => resolve('a'), 10))
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
  assert.strictEqual(syncify(a)._a, internalFunc1)
  assert.strictEqual(syncify(a).onclick, internalFunc2)
  await hydrationPromise
  assert.strictEqual(syncify(a).a, 'a')
  assert.strictEqual(syncify(a).c, 'c')
  assert.strictEqual(syncify(a).f, false)
  assert.strictEqual(syncify(a).n, null)
  assert.strictEqual(syncify(a).func, 'func')
  assert.strictEqual(syncify(a)._a, internalFunc1)
  assert.strictEqual(syncify(a).onclick, internalFunc2)
  assert.strictEqual(syncify(a).b, 'b')
  assert.strictEqual(syncify(a).ai, 'ai')
  assert.strictEqual(syncify(a).d[0][0][0].a, 'a')
  assert.throws(() => syncify({ s: Symbol.for('s') }))
  const newObj = {
    i: async function * () {
      let i = 0
      yield i
      while (true) {
        yield i++
      }
    }
  }
  syncify(newObj)._r._r = () => false
  await new Promise(resolve => setTimeout(() => resolve(''), 1))
  assert.strictEqual(syncify(newObj).i, 0)
})
