let hydrating = true
let generatorResults = new WeakMap()
let hydrationResolve = () => { }
export let hydrationPromise = new Promise(resolve => {
  hydrationResolve = () => {
    hydrating = false
    hydrationResolve = () => {}
    resolve('')
  }
})
let waitingGens = new Set()

export const reset = () => {
  hydrating = true
  generatorResults = new WeakMap()
  hydrationResolve = () => { }
  hydrationPromise = new Promise(resolve => {
    hydrationResolve = () => {
      hydrating = false
      hydrationResolve = () => {}
      resolve('')
    }
  })
  waitingGens = new Set()
}

/**
 * @template T
 * @param {AsyncGenerator<T>|AsyncIterator<T>|Promise<T>|(()=>T|(()=>Promise<T>))} value
 * @param {string|number} key
 * @param {Array<any>|Object} parent
 * @param {{r:() => boolean}} cbparent
 * @param {Object|string|number|boolean|{c:[{'skruvFinished':boolean}]}} result
 * @returns {boolean}
 */
const process = (value, key, parent, cbparent, result) => {
  if (hydrating && !(typeof result === 'object' && 'c' in result && result?.c?.[0]?.skruvFinished === false)) {
    waitingGens.delete(value)
    if (!waitingGens.size) {
      hydrationResolve()
    }
  }
  generatorResults.set(value, result)
  // @ts-expect-error: This complains, but we should always get either array and number key or object and string key
  parent[key] = result
  if (cbparent.r) {
    return cbparent.r()
  } else {
    return true
  }
}

/**
 * @template T
 * @param {AsyncGenerator<T>|AsyncIterator<T>|Promise<T>|(()=>T)|string|number|boolean|T} value
 * @param {(string|number)?} key
 * @param {(Array<any>|Object)?} parent
 * @param {{r:() => boolean}?} cbparent
 * @returns {T}
 */
export const syncify = (value, key = null, parent = null, cbparent = null, root = true) => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
    // @ts-expect-error
    return value
  }
  // @ts-expect-error
  if (generatorResults.has(value)) {
    // @ts-expect-error
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
        // @ts-expect-error
        for await (const result of (typeof value === 'function' ? value() : value)) {
          if (!process(
            // @ts-expect-error
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
      // @ts-expect-error
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
          // @ts-expect-error
          value,
          key,
          parent,
          cbparent,
          syncify(
            // @ts-expect-error
            await (typeof value === 'function' ? value() : value),
            key,
            parent,
            cbparent,
            false
          )
        )
      })()
      // @ts-expect-error
      return null
    }
    if (typeof value === 'function') {
      // check for eventlisteners or internal functions
      // TODO: Have some sort of way to pass functions to web components, check for - in parent tag name
      if (
        // @ts-expect-error: TODO: Fix better types for Vnodes (and how to typeguard for them)
        (key[0] === 'o' && key[1] === 'n') || (key === 'r' && parent?.isSkruvDom === true) ||
        key === 'skruvAfterCreate'
      ) {
        // @ts-expect-error
        return value
      }
      // @ts-expect-error
      const newValue = syncify(value(), key, parent, cbparent, false)
      generatorResults.set(value, newValue)
      return newValue
    }
  }
  if (typeof value === 'object') {
    /** @type {{r?:() => boolean}|Array<any>} */
    let newVal = {}
    let cb = newVal
    // @ts-expect-error: TODO: Fix better types for Vnodes
    if (value.isSkruvDom === true) {
      newVal.r = () => {
        if ((hydrating && !waitingGens.size) || !hydrating) {
          hydrationResolve()
        }
        return true
      }
    } else if (cbparent?.r) {
      cb = cbparent
    }
    if (Array.isArray(value)) {
      newVal = []
    }
    // Object with dummy default rerender callback
    for (const key in value) {
      // @ts-expect-error: TODO: Have a stricter check than typeof value === 'object' above
      const partialNewVal = syncify(value[key], key, newVal, cb, false)
      // @ts-expect-error
      if (partialNewVal !== null || value[key] === null) {
        // @ts-expect-error: This complains, but we will always get either array and number key or object and string key
        newVal[key] = partialNewVal
      }
    }
    // If we are at the root and did a pass with no async work the promise should resolve
    if (root && hydrating && !waitingGens.size) {
      hydrationResolve()
    }
    // @ts-expect-error
    return newVal
  }
  // @ts-expect-error
  return value
}
