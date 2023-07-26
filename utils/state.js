// @ts-nocheck
// TODO: This file will be hard to typecheck without generic types, check how to do it with TS later
const resolveTimer = globalThis?.requestAnimationFrame || (cb => setTimeout(cb, 0))

export const createState = stateObj => {
  const Handler = class Handler {
    constructor (name) {
      this.name = name
      this._scheduled = false
      this._skruv_promise = new Promise(resolve => { this._skruv_resolve = resolve })
    }

    _resolve () {
      if (this._skruv_parent && this._skruv_parent._resolve) {
        this._skruv_parent._resolve()
      }
      if (this._scheduled) { return }
      this._scheduled = true
      resolveTimer(() => {
        this._skruv_resolve()
        this._skruv_promise = new Promise(resolve => { this._skruv_resolve = resolve })
        this._scheduled = false
      })
    }

    set (target, key, value) {
      if (key === '_skruv_parent') {
        this._skruv_parent = value
        return true
      }
      if (target[key] !== value) {
        target[key] = this.recurse(key, value, target)
      }
      return true
    }

    get (target, key, proxy) {
      if (key === 'getGenerator') {
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
                return { done: false, value: proxy[key] }
              }
            }
          }
        })
      }
      if (key === 'skruv_resolve') {
        return () => this._resolve()
      }
      if (key === 'skruv_unwrap_proxy' || key === 'toJSON') {
        if (target.constructor === Object) {
          return Object.getOwnPropertyNames(target).reduce((acc, curr) => {
            acc[curr] = target[curr]?.skruv_unwrap_proxy || target[curr]
            return acc
          }, {})
        }
        if (target.constructor === Array) {
          return target.map(curr => curr?.skruv_unwrap_proxy || curr)
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
      return target[key]
    }

    deleteProperty (target, key) {
      const res = delete target[key]
      this._resolve()
      return res
    }

    recurse (path, value, target) {
      // check for falsy values
      if (value && value.constructor) {
        if (value.constructor === Object && target?.[path]?.constructor === Object) {
          for (const key of Object.getOwnPropertyNames(value)) {
            if (target[path][key] !== value[key]) {
              target[path][key] = value[key]
            }
          }
          for (const key of Object.getOwnPropertyNames(target[path])
            .filter(item => !Object.getOwnPropertyNames(value).includes(item))
          ) {
            delete target[path][key]
            this._resolve()
          }
          return target[path]
        } else if (value.constructor === Object) {
          const subProxy = new this.constructor(`${this.name}.${path}`)
          // check object properties for other objects or arrays
          value = Object.keys(value).reduce((acc, key) => {
            acc[key] = this.recurse(`${path}.${key}`, value[key])
            if (typeof acc[key] === 'object' && acc[key] !== null) { acc[key]._skruv_parent = subProxy }
            return acc
          }, {})
          value = new Proxy(value, subProxy)
          value._skruv_parent = this
          this._resolve()
        } else if (value.constructor === Array) {
          const subProxy = new this.constructor(`${this.name}.${path}`)
          // check arrays for objects or arrays
          value = value.map((child, key) => {
            const newValue = this.recurse(`${path}[${key}]`, child)
            if (typeof newValue === 'object' && newValue !== null) { newValue._skruv_parent = subProxy }
            return newValue
          })
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
  const rootProxy = new Proxy(stateObj.constructor === Array ? [] : {}, new Handler('root'))
  Object.assign(rootProxy, stateObj)
  return rootProxy
}
