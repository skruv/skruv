import waitPromise from './waitPromise.js'
/**
 * @param {number} time
 * @param {any} value
 * @returns {AsyncIterable<value>}
 */
const waitGen = (time, value) => {
  let done = false
  return {
    [Symbol.asyncIterator]: () => ({
      next: async function () {
        const newValue = await waitPromise(time, value)
        const oldDone = done
        done = true
        return { done: oldDone, value: newValue }
      }
    })
  }
}

export default waitGen
