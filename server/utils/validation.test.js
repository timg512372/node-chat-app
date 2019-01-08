const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        const result = isRealString(NaN);
        expect(result).toBe(false);
    });
    it('Should reject blank strings', () => {
        const result = isRealString('     ');
        expect(result).toBe(false);
    });
    it('Should allow real strings', () => {
        const result = isRealString(' a b c ');
        expect(result).toBe(true);
    });
});
