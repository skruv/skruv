import cache from '../cache.js'

/**
 * @param {String} url
 * @param {function(Error): void} error
 * @param {Array<*>} args
 */
const importRen = async (url, error, ...args) => await import(url).then(res => res.default(...args)).catch(e => error(e))

/**
 * @param {String} url
 * @param {{success: function(): void, error: function(Error): void}} callbacks
 * @param {Array<*>} args
 */
export const importer = (url, { success, error }, ...args) => cache(importRen, [url, ...args], success)(url, error, ...args)
