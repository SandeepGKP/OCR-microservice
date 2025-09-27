const Fuse = require('fuse.js');
const referenceTests = require('../data/referenceTests.json');

function normalizeTests(testsRaw) {
    const fuse = new Fuse(Object.keys(referenceTests), { threshold: 0.3 });
    const testsNormalized = [];

    for (let test of testsRaw) {
        const words = test.split(' ');
        const nameRaw = words[0];
        const value = parseFloat(words[1]);
        const searchResult = fuse.search(nameRaw);
        if (!searchResult.length) continue; // skip unknowns

        const name = searchResult[0].item;
        const ref = referenceTests[name];
        let status = 'normal';
        if (value < ref.low) status = 'low';
        else if (value > ref.high) status = 'high';

        testsNormalized.push({
            name,
            value,
            unit: ref.unit,
            status,
            ref_range: { low: ref.low, high: ref.high }
        });
    }

    const normalization_confidence = 0.84; // can improve with real scoring
    return { testsNormalized, normalization_confidence };
}

module.exports = { normalizeTests };
