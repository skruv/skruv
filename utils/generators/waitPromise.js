/**
 * @template T
 * @param {number} time
 * @param {T?} value
 * @returns {Promise<T?>}
 */
const waitPromise = (time, value = null) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(value)
    }, time)
  )

export default waitPromise
