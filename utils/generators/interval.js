import waitPromise from './waitPromise.js'
/**
 * @template T
 * @param {number} time
 * @param {T} value
 * @returns {AsyncGenerator<T>}
 */
const interval = async function * (time, value) {
  while (true) {
    await waitPromise(time)
    yield value
  }
}

export default interval
