console.time('ssr')
const worker = new Worker('https://local.nangija.la/skruv-test/examples/todo/ssr-deno-worker.js', {
  type: "module"
})

worker.addEventListener('message', ev => {
  console.log(ev.data.document)
  console.timeEnd('ssr')
})
