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
  socket.on('users', function(user){
	//console.log("New user " + user);
	console.log("user= " + JSON.stringify(user));
	console.log("user.push = " + user.push);
	console.log("user.name = " + user.name);
	
	
	if(user.push){
	  users.push(user.name);
	  console.log("Added user: " + user.name);
	}
	else{
	  for (var i = 0; i < users.length; i++){
	    
	    if(users[i] === user.name){
	      users.pop(i);
	      console.log("Removed user: " + users[i]);
	    }
	  }
	}
	//Send the users object
	socket.broadcast.emit('users', users);
	
	socket.emit('users', users);
  });
});

var users = new Array();