/* global fetch */
import { progress, ul, li } from 'https://unpkg.com/skruv@0.1.5/html.js'

export default async function * componentWithLoader () {
  yield progress()

  const result = await fetch('./example.json').then(res => res.json())

  yield ul({}, result.map(weekday => li({}, weekday)))
}
