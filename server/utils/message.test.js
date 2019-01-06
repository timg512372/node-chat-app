const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
    it('Should generate correct message object', () => {
        const from = 'fromhelp';
        const text = 'texthelp';
        const message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('Generate Location Message', () => {
    it('Should generate correct location object', () => {
        const from = 'fromhelp';
        const message = generateLocationMessage(from, 1, 2);
        expect(message.from).toBe(from);
        expect(message.url).toBe('https://www.google.com/maps?q=1,2');
        expect(typeof message.createdAt).toBe('number');
    });
});
