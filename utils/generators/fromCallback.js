/**
 * @param {(value: any) => any} setupFunc
 */
const fromCallback = setupFunc => {
  /**
   * @type {(value: any) => any}
   */
  let _resolver
  // we use a middleman function to be able to replace the respolver
  // @ts-ignore: TODO: Check why "A spread argument must either have a tuple type or be passed to a rest parameter"
  const resolver = (/** @type {any[]} */ ...args) => _resolver(...args)
  let promise = new Promise(resolve => {
    _resolver = resolve
  })

  /** @type AsyncIterableIterator<any> */
  const subscriber = {
    next: async () => {
      const value = await promise
      promise = new Promise(resolve => {
        _resolver = resolve
      })
      return { done: false, value }
    },
    [Symbol.asyncIterator]: () => subscriber
  }

  setupFunc(resolver)

  return subscriber
}

export default fromCallback
