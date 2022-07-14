import { parseHTML } from "https://esm.sh/linkedom";

// const html = await fetch('/index.html')
console.log(location)
const html = await Deno.readTextFile('./index.html')
const { document } = parseHTML(html)
self.window = self
window.document = document
window.requestAnimationFrame = (cb) => cb()
window.isSSR = true
window.SSRFinished = () => {
  self.postMessage({
    document: document.toString()
  })
  self.close()
}
await import('./index.js')
