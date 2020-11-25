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
     * @param {*} target
     * @param {String | Number} prop
     * @param {*} receiver
     * @returns {* | function(Array<*>): Object | Array | String | Number}
     */
    get: (target, prop, receiver) => {
      if (prop === '__skruv_state') {
        return true
      }
      if (prop === 'toJSON') {
        return target
      }
      const value = target[prop]
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
      return /** @type {function(Array<*>): Object | Array<*> | String | Number} */ function (...args) {
        // @ts-ignore
        var thisVal = this === receiver ? target : this /* Unwrap the proxy */
        const retVal = Reflect.apply(value, thisVal, args)
        // Schedule a new render if the call has change the target object and is detectable via toString
        if (target.toString() !== oldValue) callback()
        if (
          ['undefined', 'boolean', 'number', 'string', 'bigint', 'symbol', 'function'].indexOf(typeof retVal) === -1 &&
          retVal !== null
        ) {
          // Handle non-null objects
          return new Proxy(retVal, handler)
        }
        return retVal
      }
    },
    /**
     * @param {Object.<String, *>} target
     * @param {String} prop
     * @param {*} value
     */
    set: (target, prop, value) => {
      // Prevent us setting a proxy within the proxy
      const newValue = value && value.__skruv_state ? value.toJSON : value
      const changed = target[prop] !== newValue
      target[prop] = newValue
      // Schedule a new render
      if (changed) callback()
      return true
    }
  }
  return new Proxy(stateObj, handler)
}
