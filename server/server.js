const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 2000;

const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', message => {
        console.log('New Message: ', message);
        io.emit('newMessage', { ...message, createdAt: new Date().getTime() });
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
