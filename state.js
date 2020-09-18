/**
 * @param   {Object<string, *>}  stateObj
 * @param   {Function}  callback
 *
 * @return  {*}
 */
export const createState = (stateObj, callback) => {
  // If we are proxying a plain object/array we should use an empty object and then append subobjects to ensure they are proxied too
  /** @type {Boolean | Array<*> | Object} */
  let plain = false
  if (stateObj.constructor.name === 'Object') {
    plain = {}
  }
  if (stateObj.constructor.name === 'Array') {
    plain = []
  }

  // @ts-ignore
  const proxy = new Proxy(plain !== false ? plain : stateObj, {
    /**
     *
     * @param {Object} target
     * @param {string | number} prop
     * @param {*} receiver
     * @returns {* | function(Array<*>): Object | Array | string | number}
     */
    get (target, prop, receiver) {
      // Get the requested value
      const value = Reflect.get(target, prop, receiver)
      // If the value is not function we can return directly
      if (typeof value !== 'function') {
        return value
      }
      // Save the old value to compare agains after function call
      const oldValue = target.toString()
      // We need to wrap the fn call to ensure that we detect updated objects
      return /** @type {function(Array<*>): Object | Array<*> | string | number} */ (...args) => {
        const retVal = value.bind(target)(...args)
        // Schedule a new render if the call has change the target object
        if (target.toString() !== oldValue) callback()
        return retVal
      }
    },

    /**
     * @param {Object.<string, *>} target
     * @param {string} prop
     * @param {*} newVal
     */
    set: (target, prop, newVal) => {
      // Objects need to be converted to reactive proxies, reuse the same callback
      target[prop] = typeof newVal !== 'object' || newVal === null ? newVal : createState(newVal, callback)
      // Schedule a new render
      callback()
      return true
    }
  })

  // Reappend if it is a plain object/array
  if (plain !== false) {
    Object.keys(stateObj).forEach(key => { proxy[key] = stateObj[key] })
  }

  return proxy
}
