/**
 * @template T
 * @param {T} stateObj
 * @returns {import("../utilityTypes").State<T>}
 */
export const createState = stateObj => {
  const Handler = class Handler {
    constructor () {
      this._scheduled = false
      this._skruv_promise = new Promise(resolve => { this._skruv_resolve = resolve })
    }

    _resolve () {
      if (this._skruv_parent && this._skruv_parent._resolve) {
        this._skruv_parent._resolve()
      }
      if (this._scheduled) { return }
      this._scheduled = true
      setTimeout(() => {
        this._skruv_resolve('')
        this._skruv_promise = new Promise(resolve => { this._skruv_resolve = resolve })
        this._scheduled = false
      }, 0)
    }

    /**
     * @param {Record<string,any>|Array<any>} target
     * @param {string|number} key
     * @param {any} value
     * @returns {boolean}
     */
    set (target, key, value) {
      if (key === '_skruv_parent') {
        this._skruv_parent = value
        return true
      }
      // @ts-expect-error
      if (target[key] !== value) {
        // @ts-expect-error
        target[key] = this.recurse(key, value, target)
      }
      return true
    }

    /**
     * @param {Record<string,any>|Array<any>} target
     * @param {string|number|Symbol} key
     * @param {Proxy} proxy
     * @returns {any}
     */
    get (target, key, proxy) {
      if (key === 'getGenerator') {
        // @ts-expect-error
        return key => ({
          key: [key, target],
          [Symbol.asyncIterator]: () => {
            // If this is the first loop for this sub we should return directly for first value
            let booted = false
            return {
              next: async () => {
                if (booted) {
                  await this._skruv_promise
                } else {
                  booted = true
                }
                // @ts-expect-error
                return { done: false, value: proxy[key] }
              }
            }
          }
        })
      }
      if (key === 'toJSON') {
        if (target.constructor === Object) {
          return Object.getOwnPropertyNames(target).reduce((acc, curr) => {
            // @ts-expect-error
            acc[curr] = target[curr]?.toJSON || target[curr]
            return acc
          }, {})
        }
        if (target.constructor === Array) {
          return target.map(curr => curr?.toJSON || curr)
        }
        return target
      }
      if (key === Symbol.asyncIterator) {
        return () => {
          // If this is the first loop for this sub we should return directly for first value
          let booted = false
          return {
            next: async () => {
              if (booted) {
                await this._skruv_promise
              } else {
                booted = true
              }
              return { done: false, value: proxy }
            }
          }
        }
      }
      // @ts-expect-error
      return target[key]
    }

    /**
     * @param {Record<string,any>|Array<any>} target
     * @param {string|number} key
     * @returns {boolean}
     */
    deleteProperty (target, key) {
      // @ts-expect-error
      const res = delete target[key]
      this._resolve()
      return res
    }

    /**
     * @param {string} path
     * @param {any} value
     * @param {Record<string,any>|Array<any>} target
     * @returns {any}
     */
    recurse (path, value, target) {
      // check for falsy values
      if (value && value.constructor) {
        // @ts-expect-error
        if (value.constructor === Object && target?.[path]?.constructor === Object) {
          for (const key of Object.getOwnPropertyNames(value)) {
            // @ts-expect-error
            if (target[path][key] !== value[key]) {
              // @ts-expect-error
              target[path][key] = value[key]
            }
          }
          // @ts-expect-error
          for (const key of Object.getOwnPropertyNames(target[path])
            .filter(item => !Object.getOwnPropertyNames(value).includes(item))
          ) {
            // @ts-expect-error
            delete target[path][key]
            this._resolve()
          }
          // @ts-expect-error
          return target[path]
        } else if (value.constructor === Object) {
          const subProxy = new Handler()
          // check object properties for other objects or arrays
          value = Object.keys(value).reduce((acc, key) => {
            // @ts-expect-error
            acc[key] = this.recurse(`${path}.${key}`, value[key])
            // @ts-expect-error
            if (typeof acc[key] === 'object' && acc[key] !== null) { acc[key]._skruv_parent = subProxy }
            return acc
          }, {})
          // @ts-expect-error
          value = new Proxy(value, subProxy)
          value._skruv_parent = this
          this._resolve()
        } else if (value.constructor === Array) {
          const subProxy = new Handler()
          // check arrays for objects or arrays
          value = value.map((child, key) => {
            // @ts-expect-error
            const newValue = this.recurse(`${path}[${key}]`, child)
            if (typeof newValue === 'object' && newValue !== null) { newValue._skruv_parent = subProxy }
            return newValue
          })
          // @ts-expect-error
          value = new Proxy(value, subProxy)
          value._skruv_parent = this
          this._resolve()
        } else {
          this._resolve()
        }
      } else {
        this._resolve()
      }
      return value
    }
  }

  // create root proxy
  // @ts-expect-error
  const rootProxy = new Proxy(stateObj.constructor === Array ? [] : {}, new Handler('root'))
  Object.assign(rootProxy, stateObj)
  // @ts-expect-error
  return rootProxy
}
