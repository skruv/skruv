/**
 * @param   {Object<String, *>}  stateObj
 * @param   {Function}  callback
 *
 * @return  {*}
 */
export const createState = (stateObj, callback) => {
  // Taken from https://codepen.io/Escu/pen/MeKeVQ
  const Handler = class Handler {
    constructor (name) {
      this.name = name
    }

    set (o, p, v) {
      v = this.recurse(p, v)
      o[p] = v
      this.log('set', p, v)
      return true
    }

    get (o, p) {
      return o[p]
    }

    deleteProperty (o, p) {
      const res = delete o[p]
      this.log('delete', p)
      return res
    }

    recurse (p, v) {
      // check for falsy values
      if (v && v.constructor) {
        if (v.constructor === Object) {
          v.__skruv_state = true
          // check object properties for other objects or arrays
          v = Object.keys(v).reduce((pp, cc) => {
            pp[cc] = this.recurse(`${p}.${cc}`, v[cc])
            return pp
          }, {})
          // proxify objects
          v = new Proxy(v, new this.constructor(`${this.name}.${p}`))
        } else if (v.constructor === Array) {
          v.__skruv_state = true
          // check arrays for objects or arrays
          v = v.map((vv, vk) => this.recurse(`${p}[${vk}]`, vv));

          // set observers on some array methods
          ['push', 'pop', 'shift', 'unshift', 'splice', 'sort'].forEach(m => {
            v[m] = (...data) => {
              data = data.map((vv, vk) => this.recurse(`${p}[${vk}]`, vv))
              this.log(m, data)
              return Array.prototype[m].call(v, ...data)
            }
          })
        }
      }
      return v
    }

    log (msg, ...vals) {
      window.skruv_debug_active && console.log(`{${this.name}}: ${msg} ${JSON.stringify(vals)}`)
      callback()
    }
  }

  // create root proxy
  var p = new Proxy({}, new Handler('root'))
  Object.assign(p, stateObj)
  return p
}
