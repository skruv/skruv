import { elementFactory, render } from '../../index.js'
import { css, cssTextGenerator } from '../../utils/css.js'
import { createState } from '../../utils/state.js'
import { hydrationPromise, syncify } from '../../utils/syncify.js'

const { html, head, title, meta, link, body, main, h1, form, label, input, button, ol, li, a, style, script } = elementFactory

const state = createState({
  todos: ['Write todos']
})

const styles = css`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }

  body {
    max-width: 40ch;
    margin: 0 auto;
  }

  form {
    display: flex;
    align-items: end;
  }
  label { flex: 1; }
  input { width: 100%; }
  a { color: #9b9b9b; }
`

const dom = syncify(
  html({ lang: 'en-US', class: styles },
    head(
      title(state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator),
      link({ rel: 'icon', href: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }),
      meta({ name: 'description', content: 'Skruv todo-list' })
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
        label(
          'What do you need to do?',
          input({
            type: 'text',
            name: 'todo'
          })
        ),
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
      ),
      !!globalThis.skruvSSRScript && script({ type: 'module' }, globalThis.skruvSSRScript)
    )
  )
)

export const doRender = async () => {
  await hydrationPromise
  render(dom)
  // Microsleep to allow for rendering to finish
  await new Promise(resolve => setTimeout(resolve, 0))
}

doRender()
