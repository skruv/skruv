/**
 * @template T
 * @param  {...AsyncGenerator<T>} gens
 * @returns {AsyncGenerator<T[]>}
 */
const combineGens = async function * (...gens) {
  /** @type {T[][]} */
  const vals = []
  /** @type {T[]} */
  const lastVals = new Array(gens.length)
  /** @type {(arg0: T[][]) => void} */
  let resolver
  let promise = new Promise(resolve => { resolver = resolve })

  gens.forEach(async (gen, i) => {
    for await (const val of gen) {
      // Clone the last one, and modify the entry and then add to the stack
      const newVal = [...lastVals]
      newVal[i] = val
      lastVals[i] = val
      vals.push(newVal)
      resolver(vals)
    }
  })

  while (true) {
    await promise
    promise = new Promise(resolve => { resolver = resolve })
    while (vals.length) {
      const val = vals.shift()
      if (val) { yield val }
    }
  }
}

export default combineGens
