import { fetchGenerator } from './fetcher.js'
/**
 * @param {{url: string, getGenerator: (arg: string) => string}} state
 */
export default async function * router (state) {
  globalThis.addEventListener(
    'popstate',
    () => { state.url = globalThis.location?.toString?.() }
  )
  const route = async function * () {
    for await (const url of state.getGenerator('url')) {
      yield {
        where: { q: url },
        table: 'rpc/route_match'
      }
    }
  }

  for await (const res of fetchGenerator(route())) {
    if (res instanceof Error || !Array.isArray(res.body)) {
      yield res
      continue
    }
    const queryUrl = new URL(res.request.url, state.url)
    const url = new URL(queryUrl.searchParams.get('q') || '')
    const routeState = res.body[0].data

    // Handle routing arguments in path
    // TODO: ROUTING: Check how this handles slashes within route variables
    const pathsplit = url.pathname.split('/')
    routeState.arguments = routeState.path.split('/').reduce(
      /**
       * @param {Record<string, string>} p
       * @param {string} c
       * @param {number} i
       * @returns {Record<string, string>}
       */
      (p, c, i) => {
        // Match everything witin curly braces
        const match = c.match(/\{([^}]*)\}/)
        if (match?.[1]) {
          p[match[1]] = pathsplit[i]
        }
        return p
      }, {}
    )

    routeState.query = {}
    url.searchParams.forEach((value, key) => {
      routeState.query[key] = value
    })

    yield routeState
  }
}
