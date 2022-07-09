import { createState, elements, render } from '../../skruv.js'
const {
  html,
  head,
  title,
  meta,
  body,
  main,
  h1,
  form,
  input,
  ul,
  li,
  button
} = elements

const state = createState({
  language: 'en-US',
  title: 'To do list',
  todos: [],
  value: ''
})

render(
  html({ lang: state.getGenerator('language') },
    head({},
      title({}, state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      meta({ name: 'description', content: state.todos.getGenerator(0) })
    ),
    body({},
      main({},
        h1({}, state.getGenerator('title')),
        async function * () {
          for await (const currentState of state) {
            yield form(
              {
                onsubmit: e => {
                  e.preventDefault()
                  currentState.todos.unshift(currentState.value)
                }
              },
              input({ type: 'text', value: currentState.value, oninput: e => { currentState.value = e.target.value } }),
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
