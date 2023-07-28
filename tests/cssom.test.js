import assert from 'node:assert'
import test from 'node:test'

import cssom from '../utils/cssom.js'

test('cssom', async () => {
  // TODO: Port all the tests from https://github.com/NV/CSSOM/tree/master/spec
  assert.strictEqual(cssom, cssom)
})
