let socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    console.log('New Message: ', message);
    let li = jQuery('<li></li>');
    li.text(`From: ${message.from}, Text: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit(
//     'createMessage',
//     {
//         from: 'Frank',
//         text: 'hi'
//     },
//     data => {
//         console.log('Got it.', data);
//     }
// );

jQuery('#message-form').on('submit', e => {
    console.log('in the file');
    e.preventDefault();
    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: jQuery('[name=message]').val()
        },
        () => {}
    );
});
