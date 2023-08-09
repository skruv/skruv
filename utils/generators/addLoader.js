/** @typedef {import("../../skruv.js").Vnode} Vnode */
import combineGens from './combineGens.js'
import waitGen from './waitGen.js'

/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "data-skruv-finished": false }, "Loading content");
 *
 * @param {() => AsyncGenerator<Vnode|boolean|string>} component
 * @param {Vnode} loader
 */
const addLoader = async function * addLoader (component, loader) {
  for await (
    const [showLoader, loadedComponent] of combineGens(
      waitGen(300, true),
      component()
    )
  ) {
    if (loadedComponent === undefined && showLoader) {
      yield loader
    } else if (loadedComponent !== undefined) {
      yield loadedComponent
    }
  }
}

export default addLoader
