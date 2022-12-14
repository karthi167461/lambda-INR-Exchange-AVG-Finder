
const getAvgTest = require("../handler");

test('find avg for INR', async () => {
    const result = await getAvgTest.getAvgINR({});
    expect(result.status).toBe(200);
})

