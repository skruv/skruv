import { createState } from 'https://unpkg.com/skruv@0.1.5/state.js'

export const sub = createState({
  url: window.location.href,
  routeArguments: {},
  route: '',
  pages: {
    '^/examples/routing/$': 'index.js',
    '/examples/routing/page1': 'page1.js',
    '/examples/routing/page2/(?<name>.*)': 'page2.js',
    '/': '404.js'
  },
  error: {}
})
