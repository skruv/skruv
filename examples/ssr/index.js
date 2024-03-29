import { elementFactory, render } from '../../skruv.js'
import { css, cssTextGenerator } from '../../utils/css.js'
import { createState } from '../../utils/state.js'
import { hydrationPromise, syncify } from '../../utils/syncify.js'

// eslint-disable-next-line max-len
const { html, head, title, meta, link, body, main, h1, form, label, input, button, ol, li, a, style, script, skruvText: text, skruvComment: comment, skruvHeader: header } = elementFactory

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
      // @ts-expect-error: SKRUV_1
      title(state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator),
      link({ rel: 'icon', href: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }),
      meta({ name: 'description', content: 'Skruv todo-list' })
    ),
    body(
      main(
        // @ts-expect-error: SKRUV_1
        h1(state.todos.getGenerator(0)),
        form({
          onsubmit: e => {
            e.preventDefault()
            const todo = new FormData(e.currentTarget).get('todo')
              ?.toString()
            if (todo) { state.todos.unshift(todo) }
            e.currentTarget.reset()
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
      text('test'),
      comment('test'),
      header({
        name: 'x-test',
        value: 'test'
      }),
      // @ts-expect-error
      !!globalThis.skruvSSRScript && script({ type: 'module' }, globalThis.skruvSSRScript)
    )
  )
)

const doRender = async () => {
  await hydrationPromise
  render(dom)
}

doRender()

export default doRender
