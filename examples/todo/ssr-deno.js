const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const conn of server) {
  serveHttp(conn)
}

async function serveHttp(conn) {
  const httpConn = Deno.serveHttp(conn)
  for await (const requestEvent of httpConn) {
    const response = await new Promise(resolve => {
      // TODO: Cache-bust
      const worker = new Worker('https://local.nangija.la/skruv-test/examples/todo/ssr-deno-worker.js', {
        type: "module"
      })
      worker.addEventListener('message', ev => {
        resolve(ev.data)
      })
      worker.postMessage(requestEvent.request.url)
    })
    await requestEvent.respondWith(
      new Response(response.document, {
        status: response.status,
        headers: {
          'content-type': 'text/html'
        }
      }),
      // TODO: Remove and wrap in a try-catch instead
    ).catch(err => console.log(err))
  }
}