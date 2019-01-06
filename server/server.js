const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const { generateMessage } = require('./utils/message');
const port = process.env.PORT || 2000;

const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', socket => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('New Message: ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');

        // socket.broadcast.emit('newMessage', {
        //     ...message,
        //     createdAt: new Date().getTime()
        // });
    });

    // socket.emit('newMessage', {
    //     from: 'from person',
    //     text: 'message text',
    //     createdAt: new Date().toDateString()
    // });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
