const moment = require('moment');

const generateMessage = (from, text) => {
    return { from, text, createdAt: moment().valueOf() };
};

const generateLocationMessage = (from, lat, long) => {
    return {
        from,
        createdAt: moment().valueOf(),
        url: `https://www.google.com/maps?q=${lat},${long}`
    };
};

module.exports = { generateMessage, generateLocationMessage };
