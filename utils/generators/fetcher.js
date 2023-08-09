import channel from './channel.js'
import combine from './combineGens.js'
// TODO: make query builder with join/search support
// Example: http://localhost.local/api/rpc/objects_search?q=test&language=simple&limit=10&select=*,child:links!links_parent_fkey(created,objects!links_child_fkey(*)),parent:links!links_child_fkey(created,objects!links_parent_fkey(*))
/**
 * @typedef {{table: string, select: select[]}} select
 */
/**
 * @param {select[]} [select]
 * @returns {string}
 */
const buildSelect = select =>
  select?.map(v => {
    if (typeof v === 'object') {
      return `${v.table}(${buildSelect(v.select)})`
    }
    return encodeURIComponent(v)
  })?.join() || '*'

/**
 * @typedef {{field: string, condition: string, value: string}} andOr
 * @typedef {{field: string, direction: string}} order
 * @typedef {Object} pgReq
 * @property {string} table
 * @property {select[]} [select]
 * @property {andOr[]} [and]
 * @property {andOr[]} [or]
 * @property {order[]} [order]
 * @property {string} [limit]
 * @property {string} [offset]
 * @property {{ [key: string]: string; }} [where]
 */
/**
 * @param {pgReq} pg
 */
const objToPgUrl = pg =>
  [
    '/.system/db/',
    pg.table,
    '?select=',
    buildSelect(pg?.select),
    pg?.and?.[0]
      ? `&and=(${pg.and.map(dir =>
        `${encodeURIComponent(dir.field)}.${encodeURIComponent(dir.condition)
        }.${encodeURIComponent(dir.value)}`
      )
        .join()
      })`
      : '',
    pg?.or?.[0]
      ? `&or=(${pg.or.map(dir =>
        `${encodeURIComponent(dir.field)}.${encodeURIComponent(dir.condition)
        }.${encodeURIComponent(dir.value)}`
      )
        .join()
      })`
      : '',
    pg?.order?.[0]
      ? `&order=${pg.order.map(dir =>
        `${encodeURIComponent(dir.field)}.${encodeURIComponent(dir.direction)
        }`
      )
        .join(',')
      }`
      : '',
    pg?.limit ? `&limit=${parseInt(pg.limit)}` : '',
    pg?.offset ? `&offset=${parseInt(pg.offset)}` : '',
    ...Object.keys(pg?.where || {})
      .map(k => // @ts-expect-error: Won't happened, but fix anyway
        `&${encodeURIComponent(k)}=${encodeURIComponent(pg?.where[k])}`)
  ].join('')

export class HTTPError extends Error {
  /**
   * @param {{ req: string, url: string, opt: SkruvRequestInit }} request
   * @param {number} status
   * @param {Headers} headers
   * @param {JSONValue} body
   */
  constructor (request, status, headers, body) {
    super('HTTPError')
    this.name = 'HTTPError'
    this.ok = false
    this.request = request
    this.status = status
    this.headers = headers
    this.body = body
  }
}

export class HTTPEmptyError extends HTTPError {
  /**
   * @param {{ req: string, url: string, opt: SkruvRequestInit }} request
   * @param {number} status
   * @param {Headers} headers
   * @param {JSONValue} body
   */
  constructor (request, status, headers, body) {
    super(request, status, headers, body)
    this.name = 'HTTPEmptyError'
  }
}

/**
 * @typedef {Object} SkruvRequestInitAdditional
 * @property {Boolean} [allowEmpty]
 *
 * @typedef {RequestInit & SkruvRequestInitAdditional} SkruvRequestInit
 */

/**
 * @typedef {string | number | boolean | { [x: string]: any } | Array<any>} JSONValue
 */

/**
 * @typedef {Object} SkruvResponse
 * @property {Boolean} ok
 * @property {{req: string, url: string, opt: SkruvRequestInit}} request
 * @property {Headers} headers
 * @property {JSONValue} body
 */

/**
 * @param {string} req
 * @param {SkruvRequestInit} opt
 * @returns {Promise<HTTPEmptyError | HTTPError | SkruvResponse | Error>}
 */
const fetchAndParse = async (req, opt = {}) => {
  const url = typeof req === 'string' ? req : objToPgUrl(req)
  let res
  try {
    // Set the current location as a base since deno does not allow host-less fetch
    res = await fetch(new URL(url, globalThis.location.toString()), opt)
  } catch (e) {
    if (e instanceof Error) { return e }
    return new Error('Unknown fetcher error')
  }
  if (!res.ok) {
    return new HTTPError(
      { req, url, opt },
      res.status,
      res.headers,
      await res.text()
    )
  }
  const contentType = res.headers.get('content-type')
  if (
    contentType && contentType.includes('application/') &&
    contentType.includes('json')
  ) {
    const body = await res.json()
    if (
      !opt.allowEmpty &&
      (
        (Array.isArray(body) && !body.length) ||
        (typeof body === 'object' && !Object.keys(body))
      )
    ) {
      return new HTTPEmptyError(
        { req, url, opt },
        res.status,
        res.headers,
        body
      )
    }
    return {
      ok: res.ok,
      request: { req, url, opt },
      headers: res.headers,
      body
    }
  } else {
    return {
      ok: res.ok,
      request: { req, url, opt },
      headers: res.headers,
      body: await res.blob()
        .then(blob => URL.createObjectURL(blob))
    }
  }
}
/** @param {string | Request | AsyncGenerator<string> | AsyncGenerator<pgReq>} obj */
const toGenerator = async function * (obj) {
  // @ts-expect-error: TODO: Check how to properly check for this
  if (obj?.[Symbol.asyncIterator]) { yield * obj }
  yield obj
}

// Add to the combined generators, and delete the whole cache
globalThis.addEventListener?.('new_cookie_state', () => {
  // TODO: Clear cache and reload all urls
})

/**
 * @param {any} _key
 * @param {any} value
 * @returns {any}
 */
export const replacer = (_key, value) => {
  if (value?.constructor.name === 'Error') {
    return {
      type: 'Error',
      name: value.name,
      message: value.message,
      stack: value.stack,
      cause: value.cause,
      request: value.request,
      status: value.status,
      headers: value.headers,
      body: value.body
    }
  }
  return value
}

/**
 * @param {any} _key
 * @param {any} value
 * @returns {any}
 */
const reviver = (_key, value) => {
  if (value?.name === 'HTTPEmptyError') {
    return new HTTPEmptyError(
      value.request,
      value.status,
      value.headers,
      value.body
    )
  }
  if (value?.name === 'HTTPError') {
    return new HTTPError(
      value.request,
      value.status,
      value.headers,
      value.body
    )
  }
  return value
}

// TODO: Ignore cache if authenticated
export const cache = new Map(
  JSON.parse(
    document?.querySelector?.('[type="application/skruvcache+json"]')
      ?.textContent ||
    '[]',
    reviver
  )
)
export const idMap = new Map(
  JSON.parse(
    document?.querySelector?.('[type="application/skruvidmap+json"]')
      ?.textContent ||
    '[]',
    reviver
  )
)

/**
 * @param {string | Request | AsyncGenerator<string> | AsyncGenerator<pgReq>} _req
 * @param {SkruvRequestInit} opt
 * @returns {AsyncGenerator<HTTPEmptyError | HTTPError | SkruvResponse>}
 */
export const fetchGenerator = async function * (_req, opt = {}) {
  const reqGen = toGenerator(_req)
  for await (const [update, req] of combine(channel('https://127.0.0.1/event-source', 'event'), reqGen)) {
    const cacheKey = JSON.stringify({ req, opt })
    const ids = idMap.get(cacheKey) || []
    if (cacheKey?.includes(update?.id) || ids.includes(update?.id)) {
      cache.delete(cacheKey)
    }
    if (!cache.has(cacheKey)) {
      const res = await fetchAndParse(req, opt)
      cache.set(cacheKey, res)
      if (!(res instanceof Error)) {
        idMap.set(
          cacheKey,
          [
            // @ts-expect-error: TODO: Properly check for object
            res.body?.id,
            ...(Array.isArray(res.body) ? res.body?.map?.(obj => obj.id) : []),
            ...(Array.isArray(res.body)
              ? res.body?.filter?.(val => Array.isArray(val))?.map?.(val =>
                // @ts-expect-error: TODO: Properly check for object
                val.map(obj => obj?.id)
              )
              : [])
          ].filter(id => !!id)
        )
      }
    }
    yield cache.get(cacheKey)
  }
}

/**
 * Fetching a single value
 *
 * @param {string | Request | AsyncGenerator<string> | AsyncGenerator<pgReq>} req
 * @param {SkruvRequestInit} opt
 * @returns {Promise<HTTPEmptyError | HTTPError | SkruvResponse>}
 */
export const fetchSingle = (req, opt) =>
  fetchGenerator(req, opt).next()
    .then(res => res.value)
