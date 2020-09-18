import cache from '../cache.js'

/** @param {String} url */
const importRen = async (url) => await import(url).then(res => res.default())

/**
 * @param {String} url
 * @param {function(): void} view
 * @param {Array<String>} keys
 */
export const importer = (url, view, keys = []) => cache(importRen, [url, ...keys], view)(url)
