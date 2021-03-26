/* global fetch */
import { progress, table, thead, th, tbody, tr, td, div, span, button } from 'https://unpkg.com/skruv@0.1.5/html.js'
import { sub } from '../state.js'

export default async function * componentWithLoader () {
  yield progress()

  if (!sub.data.length) {
    sub.data = await fetch('./example_part1.json').then(res => res.json())
  }

  const columns = Object.keys(sub.data[0] || {})

  for await (const state of sub) {
    yield div({},
      table({},
        thead({},
          columns.map(column => th({}, column))
        ),
        tbody({},
          state.data?.slice(state.itemsPerPage * (state.page - 1), state.itemsPerPage * state.page)?.map(d => tr({}, columns.map(column => td({}, d[column]))))
        )
      ),
      div({},
        span({}, 'Page'),
        [1, 2, 3].map(page => button({
          onclick: async () => {
            state.page = page

            if (state.data.length < state.itemsPerPage * page) {
              const result = await fetch(`./example_part${page}.json`).then(res => res.json())
              sub.data = [...sub.data, ...result]
            }
          }
        }, page))
      )
    )
  }
}
