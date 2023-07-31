/**
 * @template T
 * @param {number} time
 * @param {T?} value
 * @returns {Promise<void>}
 */
const waitPromise = (time, value = null) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, time)
  )

export default waitPromise
