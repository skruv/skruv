import { h2 } from 'https://unpkg.com/skruv@0.0.6/html.js'
import { state } from '../index.js'

export default (name) => () => h2({}, state.input, name)