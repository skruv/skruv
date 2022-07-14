const worker = new Worker(new URL("./ssr-deno-worker.js", import.meta.url).href, {
  type: "module",
});

worker.addEventListener('message', ev => {
  console.log(ev.data.document)
})
