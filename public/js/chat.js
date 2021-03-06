let socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, err => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

const scrollToBottom = () => {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');

    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('updateUserList', users => {
    let ol = jQuery('<ol></ol>');
    users.forEach(user => {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', message => {
    let template = jQuery('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm');

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
    let formattedTime = moment(message.createdAt).format('h:mm');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', e => {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');

    socket.emit(
        'createMessage',
        {
            text: messageTextBox.val()
        },
        () => {
            messageTextBox.val('');
        }
    );
});

var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation Not Supported');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(
        position => {
            locationButton.removeAttr('disabled').text('Send Location');
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
