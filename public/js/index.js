let socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    // socket.emit('createMessage', {
    //     from: 'current user',
    //     text: 'message text'
    // });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    console.log('New Message: ', message);
});
