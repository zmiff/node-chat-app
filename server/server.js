const path = require('path'); //node build in module
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{console.log('New user connected');


  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('name and room name are required');
    }

    socket.join(params.room); //join chat room with name of params.room


    //socket.leave('room name');
    //io.emit emits to everybody
    //socket.broadcast.emit emits to everyone except to current user
    //socket.emit emit event to specificily one user
    //io.to('roomName').emit() emits to everyone in room 'to' can also be used on tbroadcast and io.emit

    //broadcast new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
    //emit welcome from admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    callback();
  });

  //socket.on createMessage
  socket.on('createMessage', function(message, callback){
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on port: ${port}`)
})
