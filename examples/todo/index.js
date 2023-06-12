import { createState, elements, render } from 'https://skruv.github.io/skruv/skruv.js'
const { h, css } = elements

const state = createState({
  todos: ['Write todos']
})

const styles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}

body {
  max-width: 40ch;
  margin: 0 auto;
}

form {
  display: flex;
}

input {
  flex: 1;
}
`

render(
  h('html', { lang: 'en-US' },
    h('head', {},
      h('title', {}, state.todos.getGenerator(0)),
      h('script', { src: './index.js', type: 'module' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      styles
    ),
    h('body', {},
      h('main', {},
        h('h1', {}, state.todos.getGenerator(0)),
        h('form', {
          onsubmit: e => {
            e.preventDefault()
            state.todos.unshift(new FormData(e.target).get('todo'))
            e.target.reset()
          }
        },
        h('input', {
          type: 'text',
          name: 'todo'
        }),
        h('button', {}, 'New!')
        ),
        async function * () {
          for await (const currentState of state) {
            yield h('ol', {},
              currentState.todos.map((todo, i) =>
                h('li', {}, todo, ' ',
                  h('a', {
                    href: '#',
                    onclick: () => {
                      currentState.todos.splice(i, 1)
                    }
                  }, 'x')
                )
              )
            )
          }
        }
      )
    )
  )
)
