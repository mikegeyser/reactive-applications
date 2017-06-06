var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);
setInterval(() => io.emit('ping'), 3000);

let Twit = require('twit');
let T = new Twit({
  consumer_key: 'IANgkT1nd56vRlM6Qqu3Oxn2C',
  consumer_secret: 'VyfZzl9YAAdNqHj12PRk1oX8EZXWnA58RIxjG2E1NOzhrERkPb',
  access_token: '29650035-O1mGOswJj3XeEsveSc8QW3Lz6mmYGvWWbZmPeAgXq',
  access_token_secret: 'k79NwcMe1qzLBOXbyFLwo4373lI0KLKSBzoshhK5V8IOr',
  timeout_ms: 60000
});

let stream = T.stream('statuses/filter', {
  track: [
    '@googledevs',
    '@GDEJohannesburg',
    '@mikegeyser',
    '#javascript'
  ].join(','),
  language: 'en'
});

let tweets = [];
stream.on('tweet', (status) => {
  console.log(status);
  tweets.unshift(status);
  
  if (tweets.length > 100)
    tweets.splice(100);

  io.emit('tweet', status);
});

var cors = require('cors');
app.use(cors())
app.get('/tweets', (request, response) => response.send(tweets));