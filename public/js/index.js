var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server')
});

//eventlistener newMessage.
socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('H:mm');
  console.log('New message recieved', message);
  var li = $('<li></li>');
  li.text(`${message.from} - ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('H:mm');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>'); //_blank = new tab

  li.text(`${message.from} - ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});


$('#messageForm').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage',{
    from: 'User' ,
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if ("geolocation" in navigator) {

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');;
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
} else {
  locationButton.removeAttr('disabled').text('Send Location');
  return alert('geolocation not supported by your browser');
}
});
