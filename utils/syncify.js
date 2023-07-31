let hydrating = true
const generatorResults = new WeakMap()
let hydrationResolve = () => { }
const hydrationPromise = (new Promise(resolve => { hydrationResolve = () => resolve(true) }))
const waitingGens = new Set()

/**
 * @template T
 * @param {AsyncGenerator<T>|AsyncIterator<T>|Promise<T>|(()=>T|(()=>Promise<T>))} value
 * @param {string|number} key
 * @param {Array<any>|Object} parent
 * @param {{_r:{_r:() => boolean}}} cbparent
 * @param {Object|string|number|boolean|{a:{'data-skruv-finished':boolean}}} result
 * @returns {boolean}
 */
const process = (value, key, parent, cbparent, result) => {
  if (hydrating && !(typeof result === 'object' && 'a' in result && result?.a?.['data-skruv-finished'] === false)) {
    waitingGens.delete(value)
    if (!waitingGens.size) {
      hydrating = false
      setTimeout(() => hydrationResolve(), 0)
    }
  }
  generatorResults.set(value, result)
  // @ts-ignore: This complains, but we will always get either array and number key or object and string key
  parent[key] = result
  return cbparent._r._r()
}

/**
 * @template T
 * @param {AsyncGenerator<T>|AsyncIterator<T>|Promise<T>|(()=>T)|string|number|boolean|T} value
 * @param {(string|number)?} key
 * @param {(Array<any>|Object)?} parent
 * @param {{_r:{_r:() => boolean}}?} cbparent
 * @returns {T}
 */
const syncify = (value, key = null, parent = null, cbparent = null, root = true) => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
    // @ts-ignore
    return value
  }
  // @ts-ignore
  if (generatorResults.has(value)) {
    // @ts-ignore
    return generatorResults.get(value)
  }
  if (key && parent && cbparent) {
    if (
      (typeof value === 'object' && Symbol.asyncIterator in value) ||
      (typeof value === 'function' && value.constructor.name === 'AsyncGeneratorFunction')
    ) {
      if (hydrating) { waitingGens.add(value) }
      generatorResults.set(value, null);
      (async () => {
        // @ts-ignore
        for await (const result of (typeof value === 'function' ? value() : value)) {
          if (!process(
            // @ts-ignore
            value,
            key,
            parent,
            cbparent,
            syncify(result, key, parent, cbparent, false)
          )) {
            break
          }
        }
      })()
      // @ts-ignore
      return null
    }
    if (
      (typeof value === 'object' && 'then' in value && typeof value.then === 'function') ||
      (typeof value === 'function' && value.constructor.name === 'AsyncFunction')
    ) {
      if (hydrating) { waitingGens.add(value) }
      generatorResults.set(value, null);
      (async () => {
        process(
          // @ts-ignore
          value,
          key,
          parent,
          cbparent,
          syncify(
            // @ts-ignore
            await (typeof value === 'function' ? value() : value),
            key,
            parent,
            cbparent,
            false
          )
        )
      })()
      // @ts-ignore
      return null
    }
    if (typeof value === 'function') {
      // check for eventlisteners or internal functions
      // TODO: Have some sort of way to pass functions to web components
      if (typeof key === 'string' && ((key[0] === 'o' && key[1] === 'n') || key[0] === '_')) {
        // @ts-ignore
        return value
      }
      // @ts-ignore
      const newValue = syncify(value(), key, parent, cbparent, false)
      generatorResults.set(value, newValue)
      return newValue
    }
  }
  if (typeof value === 'object') {
    /** @type {{_r:{_r:() => boolean}}|Array<any>} */
    let newVal = {
      _r: {
        _r: () => {
          if ((hydrating && !waitingGens.size) || !hydrating) {
            hydrating = false
            setTimeout(() => hydrationResolve(), 0)
          }
          return true
        }
      }
    }
    let cb = newVal
    if (Array.isArray(value) && cbparent?._r) {
      newVal = []
      cb = cbparent
    }
    // Object with dummy default rerender callback
    for (const key in value) {
      // @ts-ignore: TODO: Have a stricter check than typeof value === 'object' above
      const partialNewVal = syncify(value[key], key, newVal, cb, false)
      // @ts-ignore
      if (partialNewVal !== null || value[key] === null) {
        // @ts-ignore: This complains, but we will always get either array and number key or object and string key
        newVal[key] = partialNewVal
      }
    }
    // If we are at the root and did a pass with no async work the promise should resolve
    if ((root && hydrating && !waitingGens.size) || !hydrating) {
      hydrating = false
      setTimeout(() => hydrationResolve(), 0)
    }
    // @ts-ignore
    return newVal
  }
  // @ts-ignore
  return value
}

export { hydrationPromise, syncify }
