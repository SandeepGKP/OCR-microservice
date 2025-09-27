const fullNames = {
    'Hemoglobin': 'hemoglobin',
    'WBC': 'white blood cell count'
};

function generateSummary(tests) {
    const summaryParts = [];
    const explanations = [];

    for (let t of tests) {
        const displayName = fullNames[t.name] || t.name.toLowerCase();
        if (t.status === 'low') {
            summaryParts.push(`Low ${displayName}`);
            if (t.name === 'Hemoglobin') {
                explanations.push(`Low hemoglobin may relate to anemia.`);
            } else {
                explanations.push(`Low ${t.name.toLowerCase()} may require medical attention.`);
            }
        } else if (t.status === 'high') {
            summaryParts.push(`High ${displayName}`);
            if (t.name === 'WBC') {
                explanations.push(`High WBC can occur with infections.`);
            } else {
                explanations.push(`High ${t.name.toLowerCase()} can indicate an underlying condition.`);
            }
        }
    }

    const summary = summaryParts.length ? summaryParts.join(' and ') + '.' : 'All test values are normal.';
    return { summary, explanations };
}

module.exports = { generateSummary };
