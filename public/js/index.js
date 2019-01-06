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

socket.on('newLocationMessage', message => {
    console.log('New Location Message ', message);
    let li = jQuery('<li></li>');
    li.text(`From: ${message.from} `);

    let a = jQuery('<a target="_blank"> My Current Location </a>');
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

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

var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation Not Supported');
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        err => {
            return alert('Unable to fetch location');
        }
    );
});
