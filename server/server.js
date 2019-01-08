const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const port = process.env.PORT || 2000;

const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);
let users = new Users();

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        console.log(user);
        if (user) {
            console.log('User disconnected');

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast
            .to(params.room)
            .emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            callback('This is from the server.');
        }
    });

    socket.on('createLocationMessage', coords => {
        let user = users.getUser(socket.id);
        console.log('createLocationmessage');

        if (user) {
            io.to(user.room).emit(
                'newLocationMessage',
                generateLocationMessage(user.name, coords.latitude, coords.longitude)
            );
        }
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
