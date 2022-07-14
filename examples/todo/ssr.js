import jsdom from 'jsdom'
import fs from 'fs/promises'
const { JSDOM } = jsdom;
//const html = await fetch('https://skruv.github.io/skruv-new-setup/examples/todo/index.html').then(res => res.text())
const html = await fs.readFile('index.html')

console.time("dom")
const dom = new JSDOM(html, {
  url: "file:///home/svanterichter/Desktop/notes/projects/skruv/examples/todo/index.html",
  referrer: "file:///home/svanterichter/Desktop/notes/projects/skruv/examples/todo/index.html",
  contentType: "text/html",
  includeNodeLocations: false,
  runScripts: "dangerously",
  resources: "usable",
  beforeParse(window) {
    window.requestAnimationFrame = (cb) => cb()
    window.isSSR = true
    window.logOuter = (...args) => console.log(...args)
    window.SSRFinished = () => {
      console.log(dom.serialize())
      console.timeEnd("dom")
    }
  }
})
