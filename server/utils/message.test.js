const expect = require('expect');
const { generateMessage } = require('./message');

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
