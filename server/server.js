const path = require('path'); //node build in module
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

//emit welcome from admin
  socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

//broadcast new user joined
  socket.broadcast.emit('newMessage',{
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  //socket.on createMessage
  socket.on('createMessage', function(message){
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on port: ${port}`)
})
