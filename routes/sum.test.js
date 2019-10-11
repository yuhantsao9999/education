const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(4, 2)).toBe(6);
    expect(sum(2, null)).toBeNull();
});