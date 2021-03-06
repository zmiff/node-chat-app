var socket = io();

function scrollToBottom(){
  //selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')
  //height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('no error')
    }
  });
});

socket.on('disconnect', function(){
  console.log('disconnected from server')
});

socket.on('updateUserList',(users)=>{
  var ol = $('<ol></ol>');

  users.forEach(function(user){
      ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
})

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
  scrollToBottom();
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
  scrollToBottom();
});


$('#messageForm').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage',{
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
