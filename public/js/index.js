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
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
  $('#messages').append(html);
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
