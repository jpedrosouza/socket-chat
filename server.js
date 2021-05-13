const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/test', (req, res) => {
    return res.json({ message: 'Hello World!' })
})

io.on('connection', (socket) => {
    console.log(`User connected with id: ${socket.id}`)

    socket.on('new message', (message) => {
        console.log('User message is: ' + message)
    })

})

server.listen(3000, () => {
    console.log('Server on in http://localhost: 3000')
})