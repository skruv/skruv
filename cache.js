const createCache = () => ({
  map: new Map(),
  weakmap: new WeakMap()
})

const cache = createCache()

/**
 * @param   {*} value
 * @return  {String}
 */
const getCacheType = (value) => {
  const t = typeof value
  const isObject = (t === 'object' || t === 'function') && value !== null
  return isObject ? 'weakmap' : 'map'
}

/**
 * @param   {function} fn
 * @param   {Array<*>} prefix
 * @param   {function} callback
 *
 * @return  {*}
 */
const get = (fn, prefix = [], callback = () => {}) => /** @param {Array<*>} args */ (...args) => {
  const item = [...prefix, fn.name, ...args].reduce((acc, cur) => {
    if (acc[getCacheType(cur)].get(cur)) {
      return acc[getCacheType(cur)].get(cur)
    }
    acc[getCacheType(cur)].set(cur, createCache())
    return acc[getCacheType(cur)].get(cur)
  }, cache)
  if (!item.map.has('value')) {
    const res = fn(...args)
    if (typeof res !== 'object' || typeof res.then !== 'function') {
      item.map.set('value', res)
    } else {
      (async () => {
        try {
          const value = await res
          item.map.set('value', value)
          callback()
        } catch (e) {
          item.map.set('value', e)
          callback()
        }
      })()
    }
  }
  return item.map.get('value')
}

export default get
