/** @typedef {import("../../utilityTypes").AnyContent} AnyContent */
import combineGens from './combineGens.js'
import waitGen from './waitGen.js'

/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "skruvFinished": false }, "Loading content");
 * @template T, L
 * @param  {() => AsyncGenerator<T>} component
 * @param {L} loader
 * @param {number} [waitTime = 300]
 *
 * @returns {AsyncGenerator<T | L>}
 */
const addLoader = async function * addLoader (component, loader, waitTime = 300) {
  /** @type {(T & AsyncGenerator<L>)[]} */ // @ts-ignore
  const gens = [waitGen(waitTime, loader), component()]
  for await (const [showLoader, loadedComponent] of combineGens(...gens)) {
    if (loadedComponent === undefined && showLoader) {
      yield loader
    } else if (loadedComponent !== undefined) {
      yield loadedComponent
    }
  }
}

export default addLoader
