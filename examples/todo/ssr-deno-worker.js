// TODO: host this locally
import { parseHTML } from 'https://esm.sh/linkedom'

self.onmessage = async e => {
  const html = await fetch('/index.html').then(res => res.text())
  const { document } = parseHTML(html)
  self.window = self
  window.document = document
  window.SSRlocation = new URL(e.data, window.location.href)
  window.SSRlocation.host = window.location.host
  window.requestAnimationFrame = cb => cb()
  window.document.documentElement.isSkruvSSR = true
  window.document.documentElement.skruvRenderFinished = () => {
    document.querySelector('html').setAttribute('data-ssr-rendered', true)
    self.postMessage({
      status: 200,
      document: document.toString()
    })
    self.close()
  }

  // TODO: return the index.html, but with an error message here. JS-able clients should attempt client-side rendering
  setTimeout(() => {
    self.postMessage({
      status: 500,
      document: '500 internal server error'
    })
    self.close()
  }, 3000)

  // Polyfill CSSOM support
  // TODO: Check why we need to build cssom for deno to like it
  const cssom = await import('/skruv-test/examples/todo/cssom.esm.js').then(res => res.default)
  self.CSSOM = cssom
  self.CSSMediaRule = cssom.CSSMediaRule
  self.CSSStyleRule = cssom.CSSStyleRule

  await import(document.querySelector('script').getAttribute('src'))
}
