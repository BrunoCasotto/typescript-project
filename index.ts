import Message from './resources/js/components/message/message';

(function() {
  let messageVIrtual = new Message('Bruno Casotto', 'Lorem ipsum dolor sit amet');
  let messagesDom = document.getElementById('messages');
  messageVIrtual.render(messagesDom);
})()

