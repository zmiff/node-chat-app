const path = require('path'); //node build in module
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

//emit welcome from admin
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

//broadcast new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joind'))

  //socket.on createMessage
  socket.on('createMessage', function(message){
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

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
