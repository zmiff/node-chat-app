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

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server is up on port: ${port}`)
})
