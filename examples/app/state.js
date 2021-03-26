import { createState } from 'https://unpkg.com/skruv@0.1.5/state.js'

export const sub = createState({
  url: window.location.href,
  routeArguments: {},
  route: '',
  pages: {
    '^/examples/app/$': 'index.js',
    '/examples/app/page1': 'page1.js',
    '/': '404.js'
  },
  error: {},
  data: [],
  page: 1,
  itemsPerPage: 20
})
