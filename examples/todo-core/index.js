import { elementFactory, render } from '../../index.js'

const { html, head, title, meta, body, main, h1, form, input, button, ol, li, a, style } = elementFactory

const state = {
  todos: ['Write todos']
}

const styles = /* css */`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }

  body {
    max-width: 40ch;
    margin: 0 auto;
  }

  form { display: flex; }
  input { flex: 1; }
  a { color: #9b9b9b; }
`

const doRender = () => render(
  html({ lang: 'en-US' },
    head(
      title(state.todos[0]),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(styles)
    ),
    body(
      main(
        h1(state.todos[0]),
        form({
          onsubmit: /** @param {SubmitEvent} e */ e => {
            e.preventDefault()
            // @ts-ignore: The target here is a form.
            state.todos.unshift(new FormData(e.target).get('todo')) && e.target.reset()
            doRender()
          }
        },
        input({
          name: 'todo'
        }),
        button('New!')
        ),
        ol(
          state.todos.map((todo, i) => li(
            `${todo} `,
            a({
              href: '#',
              onclick: /** @param {MouseEvent} e */ e => {
                e.preventDefault()
                state.todos.splice(i, 1)
                doRender()
              }
            }, 'x')
          ))
        )
      )
    )
  )
)
doRender()
