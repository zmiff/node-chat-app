const path = require('path'); //node build in module
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{console.log('New user connected');


  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are required');
    }

    socket.join(params.room); //join chat room with name of params.room
    users.removeUser(socket.id);//first remove user if alrady exists to prevent dubplicates
    users.addUser(socket.id, params.name, params.room);//addUser to room

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //broadcast new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat`));
    //emit welcome from admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    callback();
  });

  //socket.on createMessage
  socket.on('createMessage', function(message, callback){
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);

    if(user){
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
  });
});

server.listen(port,()=>{
  console.log(`server is up on port: ${port}`)
})
