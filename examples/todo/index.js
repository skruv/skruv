import { createState, elements, render } from '../../skruv.js'
const {
  html,
  head,
  title,
  meta,
  script,
  body,
  main,
  h1,
  div,
  form,
  input,
  ul,
  li,
  button
} = elements

const state = createState({
  todos: ['Write todos'],
  value: ''
})

render(
  html({ lang: 'en-US', 'data-ssr': !!window.isSSR },
    head({},
      title({}, state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      script({ src: './index.js' }),
    ),
    body({},
      main({},
        h1({}, state.todos.getGenerator(0)),
        async function * () {
          yield div({'data-skruv-finished': true}, 'Loading')
          for await (const currentState of state) {
            yield form(
              {
                onsubmit: e => {
                  e.preventDefault()
                  currentState.todos.unshift(currentState.value)
                }
              },
              input({
                type: 'text',
                value: currentState.value,
                oninput: e => { currentState.value = e.target.value }
              }),
              ul({},
                currentState.todos.map(todo => li({}, todo))
              ),
              button({}, 'New!')
            )
          }
        }
      )
    )
  )
)
