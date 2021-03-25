import { sub } from './state.js'

;(async () => {
  window.addEventListener('popstate', () => {
    if (sub.url !== window.location.href) {
      sub.url = window.location.href
    }
  })

  for await (const state of sub) {
    let routeArguments = {}
    let route = ''
    const pathname = new URL(state.url).pathname
    Object.keys(state.pages).forEach(path => {
      const match = pathname.match(new RegExp(path))
      const { groups } = match || {}
      if (match && (Object.keys(groups || {}).length > Object.keys(routeArguments).length || path.length > route.length)) {
        route = path
        routeArguments = groups || {}
      }
    })
    if (route !== state.route) {
      state.route = route
    }
    if (JSON.stringify(state.routeArguments) !== JSON.stringify(routeArguments || {})) {
      state.routeArguments = routeArguments
    }
  }
})()
