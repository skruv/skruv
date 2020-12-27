export const createState = (stateObj) => {
  // Modified from https://codepen.io/Escu/pen/MeKeVQ
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
      window.requestAnimationFrame(() => {
        this._skruv_resolve()
        this._skruv_promise = new Promise(resolve => { this._skruv_resolve = resolve })
        this._scheduled = false
      })
    }

    set (o, p, v) {
      if (p === '_skruv_parent') {
        this._skruv_parent = v
        return true
      }
      v = this.recurse(p, v)
      o[p] = v
      this._resolve()
      return true
    }

    get (o, p, proxy) {
      if (p === 'skruv_resolve') {
        return () => this._resolve()
      }
      if (p === 'skruv_unwrap_proxy') {
        return o
      }
      if (p === Symbol.asyncIterator) {
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
      return o[p]
    }

    deleteProperty (o, p) {
      const res = delete o[p]
      this._resolve()
      return res
    }

    recurse (p, v) {
      // check for falsy values
      if (v && v.constructor) {
        if (v.constructor === Object) {
          // check object properties for other objects or arrays
          v = Object.keys(v).reduce((pp, cc) => {
            pp[cc] = this.recurse(`${p}.${cc}`, v[cc])
            if (typeof pp[cc] === 'object') pp[cc]._skruv_parent = v
            return pp
          }, {})
          // proxify objects
          v = new Proxy(v, new this.constructor(`${this.name}.${p}`))
          v._skruv_parent = this
        } else if (v.constructor === Array) {
          // check arrays for objects or arrays
          v = v.map((vv, vk) => {
            const cc = this.recurse(`${p}[${vk}]`, vv)
            if (typeof cc === 'object') cc._skruv_parent = v
            return cc
          })
          v = new Proxy(v, new this.constructor(`${this.name}.${p}`))
          v._skruv_parent = this;

          // set observers on some array methods
          ['push', 'pop', 'shift', 'unshift', 'splice', 'sort'].forEach(m => {
            v[m] = (...data) => {
              data = data.map((vv, vk) => this.recurse(`${p}[${vk}]`, vv))
              const ret = Array.prototype[m].call(v, ...data)
              this._resolve()
              return ret
            }
          })
        }
      }
      return v
    }
  }

  // create root proxy
  var p = new Proxy({}, new Handler('root'))
  Object.assign(p, stateObj)
  return p
}
