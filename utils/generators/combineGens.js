const combineGens = async function * (
  /** @type {AsyncIterable<any>[]} */ ...gens
) {
  /** @type {any[][]} */
  const vals = []
  const lastVals = new Array(gens.length)
  /** @type {(arg0: any[][]) => void} */
  let resolver
  let promise = new Promise(resolve => {
    resolver = resolve
  })

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
    promise = new Promise(resolve => {
      resolver = resolve
    })
    while (vals.length) {
      yield vals.shift()
    }
  }
}

export default combineGens
