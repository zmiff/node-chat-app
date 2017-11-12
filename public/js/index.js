var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server')
});

//eventlistener newMessage.
socket.on('newMessage', function(message){
  console.log('New message recieved', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
})


$('#messageForm').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User' ,
    text: $('[name=message]').val()
  },function(){

  });
});
