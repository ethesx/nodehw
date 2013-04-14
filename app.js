var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(4200);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log("I Received= " + msg);
    socket.broadcast.send(msg);
  });

  socket.on('markup', function(markup){
	console.log("Markup Received= " + markup);
	socket.broadcast.emit('markup', markup);
	  });
});