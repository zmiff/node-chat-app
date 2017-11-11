var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server')
});

//eventlistener newMessage.
socket.on('newMessage', function(messageData){
  console.log('New message recieved', messageData);
})
