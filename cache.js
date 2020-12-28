const createCache = () => ({
  map: new Map(),
  weakmap: new WeakMap()
})

const cache = createCache()

const getCacheType = (value) => {
  const t = typeof value
  const isObject = (t === 'object' || t === 'function') && value !== null
  return isObject ? 'weakmap' : 'map'
}

const get = (fn, prefix = []) => (...args) => {
  const item = [...prefix, fn.name, ...args].reduce((acc, cur) => {
    if (acc[getCacheType(cur)].get(cur)) {
      return acc[getCacheType(cur)].get(cur)
    }
    acc[getCacheType(cur)].set(cur, createCache())
    return acc[getCacheType(cur)].get(cur)
  }, cache)
  if (!item.map.has('value')) {
    const res = fn(...args)
    item.map.set('value', res)
  }
  return item.map.get('value')
}

export default get
