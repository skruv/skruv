import { htmlFactory, render } from '../../index.js'
import { css, cssTextGenerator } from '../../utils/css.js'
import { createState } from '../../utils/state.js'

const { html, head, title, script, meta, body, main, h1, form, input, button, ol, li, a, style } = htmlFactory

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

export const doRender = () => render(
  html({ lang: 'en-US', class: styles },
    head(
      title(state.todos.getGenerator(0)),
      script({ src: './index.js', type: 'module' }),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator)
    ),
    body(
      main(
        h1(state.todos.getGenerator(0)),
        form({
          onsubmit: e => {
            e.preventDefault()
            state.todos.unshift(new FormData(e.target).get('todo'))
            e.target.reset()
          }
        },
        input({
          type: 'text',
          name: 'todo'
        }),
        button('New!')
        ),
        async function * () {
          for await (const currentState of state) {
            yield ol(
              currentState.todos.map((todo, i) => li(
                `${todo} `,
                a({
                  href: '#',
                  onclick: e => {
                    e.preventDefault()
                    currentState.todos.splice(i, 1)
                  }
                }, 'x')
              ))
            )
          }
        }
      )
    )
  )
)

doRender()
