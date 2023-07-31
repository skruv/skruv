import waitPromise from './waitPromise.js'
/**
 * @template T
 * @param {number} time
 * @param {T} value
 * @returns {AsyncGenerator<T>}
 */
const waitGen = async function * (time, value) {
  await waitPromise(time)
  yield value
}

export default waitGen
