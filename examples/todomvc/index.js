import { renderNode } from 'https://unpkg.com/skruv@0.0.10/vDOM.js'
import { createState } from 'https://unpkg.com/skruv@0.0.10/state.js'
import { section, header, footer, input, label, span, div, button, ul, li, h1, a, strong } from 'https://unpkg.com/skruv@0.0.10/html.js'

const ENTER_KEY = 13

const viewroot = () => section({ class: 'todoapp' },
  header({ class: 'header' },
    h1({}, 'todos'),
    input({
      class: 'new-todo',
      placeholder: 'What needs to be done?',
      autofocus: '',
      onblur: (evt) => {
        if (evt.target.value.trim()) {
          state.todos.push({
            title: evt.target.value.trim(),
            completed: false,
            editing: false
          })
          evt.target.value = ''
        }
      },
      onkeydown: (evt) => {
        if (evt.keyCode === ENTER_KEY) {
          evt.target.blur()
          evt.target.focus()
        }
      }
    })
  ),
  !!state.todos.length && section({ style: 'display: block;', class: 'main' },
    input({
      id: 'toggle-all',
      class: 'toggle-all',
      type: 'checkbox',
      onclick: () => {
        const onoroff = state.todos.filter(todo => !todo.completed).length
        state.todos.forEach((todo, index) => { state.todos[index].completed = !!onoroff })
      }
    }),
    label({ for: 'toggle-all' }, 'Mark all as complete'),
    ul({ class: 'todo-list' },
      state.todos.filter(todo =>
        (state.filter === 'all') ||
        (state.filter === 'completed' && todo.completed) ||
        (state.filter === 'active' && !todo.completed)
      ).map((todo, index) =>
        li({
          class: [
            todo.completed && 'completed',
            todo.editing && 'editing'
          ].join(' '),
          ondblclick: () => {
            if (!todo.editing) {
              state.todos.forEach((todo, index) => { state.todos[index].editing = false })
              state.todos[index].editing = true
            }
          }
        },
        todo.editing
          ? input({
            autofocus: '',
            class: 'edit',
            value: todo.title,
            oncreate: (elem) => elem.focus(),
            onblur: (evt) => {
              if (!evt.target.value.trim()) {
                state.todos.splice(index, 1)
              } else {
                state.todos[index].title = evt.target.value.trim()
                state.todos[index].editing = false
              }
            },
            onkeydown: (evt) => {
              if (evt.keyCode === ENTER_KEY) {
                evt.target.blur()
              }
            }
          })
          : div({ class: 'view' },
            input({
              class: 'toggle',
              type: 'checkbox',
              checked: !!todo.completed,
              onclick: () => { state.todos[index].completed = !todo.completed }
            }),
            label({}, todo.title),
            button({
              class: 'destroy',
              onclick: () => state.todos.splice(index, 1)
            })
          )
        )
      )
    ),
    !!state.todos.length && footer({ class: 'footer' },
      () => {
        const left = state.todos.filter(todo => !todo.completed).length
        return span({ class: 'todo-count' }, strong({}, left), ` item${left === 1 ? '' : 's'} left`)
      },
      ul({ class: 'filters' },
        li({},
          a({
            href: '#/',
            onclick: () => { state.filter = 'all' },
            class: state.filter === 'all' && 'selected'
          }, 'All')
        ),
        li({},
          a({
            href: '#/active',
            onclick: () => { state.filter = 'active' },
            class: state.filter === 'active' && 'selected'
          }, 'Active')
        ),
        li({},
          a({
            href: '#/completed',
            onclick: () => { state.filter = 'completed' },
            class: state.filter === 'completed' && 'selected'
          }, 'Completed')
        )
      ),
      !!state.todos.filter(todo => todo.completed).length && button({
        class: 'clear-completed',
        onclick: () => {
          state.todos = state.todos.filter(todo => !todo.completed)
        }
      }, 'Clear completed')
    )
  )
)

let root = document.querySelector('.todoapp')

const render = () => { root = renderNode(viewroot(), root) }

let scheduled = false
export const view = () => {
  if (scheduled) return
  scheduled = true
  window.requestAnimationFrame(() => {
    scheduled = false
    render()
    // Save todos on updates
    window.localStorage.setItem('todos-skruv', JSON.stringify(state.todos.map(todo => ({
      title: todo.title, completed: todo.completed
    }))))
  })
}

view()

const persistedState = {
  todos: [],
  filter: window.location.hash.slice(2) || 'all'
}

try {
  persistedState.todos = JSON.parse(window.localStorage.getItem('todos-skruv')) || []
} catch (e) {
  console.warn('No or invalid state in storage, using default')
}

export const state = createState(persistedState, view)
