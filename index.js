var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', socket.nickName + ': ' + msg)
  })

  socket.on('set nickName', function (nickName) {
    if (socket.nickName) {
      io.emit('set nickName', socket.nickName + '更名为' + nickName)
    } else {
      io.emit('set nickName', nickName + '上线了')
    }
    socket.nickName = nickName
  })
})

http.listen(3333, function () {
  console.log('listening on *:3333')
})
