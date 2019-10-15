const diff = require('./diff');

test('difference set between two array', () => {
    expect(diff([1, 3, 5, 6], [2, 6])).toStrictEqual([1, 3, 5]);
    expect(diff([1, 3, null, 6], [2, 6])).toStrictEqual([1, 3]);
    expect(diff([1, 3, 6], [1, 3, 6])).toStrictEqual([]);
});