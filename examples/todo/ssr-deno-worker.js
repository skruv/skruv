import { parseHTML } from "https://esm.sh/linkedom"

const html = await fetch('/index.html').then(res => res.text())
const { document } = parseHTML(html)
const cacheBust = document.querySelector('body').getAttribute('data-cache-bust')
self.window = self
window.document = document
window.SSRlocation = new URL('/', window.location.href)
window.requestAnimationFrame = cb => cb()
window.isSSR = true
window.SSRFinished = () => {
  self.postMessage({
    document: document.toString()
  })
  self.close()
}
// Polyfill CSSOM support
const cssom = await import('/skruv-test/examples/todo/cssom.esm.js').then(res => res.default)
self.CSSOM = cssom
self.CSSMediaRule = cssom.CSSMediaRule
self.CSSStyleRule = cssom.CSSStyleRule

await import(`/${cacheBust}/out.js`)
