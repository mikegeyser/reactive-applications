var http = require('http');
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log('a user connected');
});

setTimeout(() => io.emit('ping', 500));

var server = http.createServer((request, response) => { });

server.on('request', function (request, response) {
  response.write('Hello world?');
  response.end();
});


server.listen(3000, function () {
  console.log('listening on *:3000');
});