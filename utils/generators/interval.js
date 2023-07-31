/**
 * @param {number} interval
 * @returns {AsyncIterable<void>}
 */
const interval = interval => {
  /** @type {function} */
  let resolver = () => {}
  let promise = new Promise(resolve => {
    resolver = resolve
  })

  /** @type AsyncIterableIterator<void> */
  const subscriber = {
    next: async () => {
      const value = await promise
      promise = new Promise(resolve => {
        resolver = resolve
      })
      return { done: false, value }
    },
    [Symbol.asyncIterator]: () => subscriber
  }

  resolver()

  setInterval(() => resolver(), interval)

  return subscriber
}

export default interval
