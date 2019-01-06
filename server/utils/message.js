const generateMessage = (from, text) => {
    return { from, text, createdAt: new Date().getTime() };
};

const generateLocationMessage = (from, lat, long) => {
    return {
        from,
        createdAt: new Date().getTime(),
        url: `https://www.google.com/maps?q=${lat},${long}`
    };
};

module.exports = { generateMessage, generateLocationMessage };
