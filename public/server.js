var http = require('http');
function onRequest(req, res) {
  console.log('received a request on ' + req.url)
}

http
