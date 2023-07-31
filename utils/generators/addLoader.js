import combineGens from './combineGens.js'
import waitGen from './waitGen.js'

/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "data-skruv-finished": false }, "Loading content");
 *
 * @param {AsyncGenerator<Vnode>} component
 * @param {import("../../index.js").Vnode} loader
 */
const addLoader = async function * addLoader (component, loader) {
  for await (
    const [showLoader, loadedComponent] of combineGens(
      waitGen(300, true),
      component()
    )
  ) {
    if (!loadedComponent && showLoader) {
      yield loader
    } else if (loadedComponent) {
      yield loadedComponent
    }
  }
}

export default addLoader
