/**
 * @template T
 * @param {(value: (value: T[]) => void) => T} setupFunc
 * @returns {AsyncGenerator<T[]>}
 */
const fromCallback = async function * (setupFunc) {
  /** @type {(value: T[]) => void} */
  let _resolver
  // we use a middleman function to be able to replace the resolver
  /** @type {(value: T[]) => void} */
  const resolver = (...args) => _resolver(...args)
  /** @type {Promise<T[]>} */
  let promise = new Promise(resolve => {
    _resolver = resolve
  })
  setupFunc(resolver)

  while (true) {
    const value = await promise
    promise = new Promise(resolve => {
      _resolver = resolve
    })
    yield value
  }
}

export default fromCallback
