/**
 * @param   {Object<String, *>}  stateObj
 * @param   {Function}  callback
 *
 * @return  {*}
 */
export const createState = (stateObj, callback) => {
  var handler = {
    /**
     *
     * @param {Object} target
     * @param {String | Number} prop
     * @param {*} receiver
     * @returns {* | function(Array<*>): Object | Array | String | Number}
     */
    get: (target, prop, receiver) => {
      if (prop === 'toJSON') {
        return target
      }
      const value = Reflect.get(target, prop, receiver)
      if (
        ['undefined', 'boolean', 'number', 'string', 'bigint', 'symbol', 'function'].indexOf(typeof value) === -1 &&
        value !== null
      ) {
        // Handle non-null objects
        return new Proxy(value, handler)
      } else if (typeof value !== 'function') {
        // Handle scalar values and null
        return value
      }
      // Keep the old toString value for diffing
      const oldValue = target.toString()
      // Handle function calls on objects and try to find diffs via toString
      return /** @type {function(Array<*>): Object | Array<*> | String | Number} */ (...args) => {
        const retVal = value.bind(target)(...args)
        // Schedule a new render if the call has change the target object and is detectable via toString
        if (target.toString() !== oldValue) callback()
        return retVal
      }
    },
    /**
     * @param {Object.<String, *>} target
     * @param {String} prop
     * @param {*} value
     */
    set: (target, prop, value) => {
      target[prop] = value
      // Schedule a new render
      callback()
      return true
    }
  }
  return new Proxy(stateObj, handler)
}
