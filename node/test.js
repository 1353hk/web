const http = require('http');
const url = require('url');
const c = require('./util/console.js');

function start() {
  function onRequest(request, response) {
    const { pathname } = url.parse(request.url);
    console.log(`Request for ${pathname} received.`);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

start();
