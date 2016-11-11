
var pusher = new Pusher('6e5f67bde794d28881ed', {
  encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
  addChatMessage(chat)
})

var messageInput = document.getElementById('message')
document.getElementById('message').addEventListener('keypress', getChats)

function getChats(e) {
  if (e.key === 'Enter') {
    inputValue(messageInput.value)  //Why don't I need this??
    }
}

function inputValue() {
  fetch('/chats', {
	method: 'post',
	headers: {
  	'Content-Type': 'application/json'
},
	body: JSON.stringify({
		message: messageInput.value,
	})
});
}

function addChatMessage(chat) {
  var message = document.getElementById('messages')
  var opp = document.createElement('li')
  opp.classList.add('list-group-item')
  opp.innerHTML = chat.message
  message.insertBefore(opp, message.childNodes[0])
  messageInput.value = ''
}
