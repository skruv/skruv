/**
 * @param {number} time
 * @param {any} value
 * @returns {Promise<value>}
 */
const waitPromise = (time, value) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(value)
    }, time)
  )

export default waitPromise
