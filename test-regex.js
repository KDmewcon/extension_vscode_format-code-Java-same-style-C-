// Test regex patterns
function testRegex() {
    let testCases = [
        "i + +",
        "value = = 1",
        "count + + ;",
        "i + + )",
        "= = 1",
        "! = 1"
    ];

    console.log("Testing regex patterns:");

    testCases.forEach(test => {
        console.log(`\nOriginal: "${test}"`);

        let result = test;

        // Test our new patterns
        result = result.replace(/\+\s+\+/g, '++');
        result = result.replace(/-\s+-/g, '--');
        // With word before
        result = result.replace(/(\w+)\s*=\s+=\s*/g, '$1 == ');
        result = result.replace(/(\w+)\s*=\s+=(\w)/g, '$1 == $2');
        result = result.replace(/(\w+)\s*!\s+=\s*/g, '$1 != ');
        result = result.replace(/(\w+)\s*!\s+=(\w)/g, '$1 != $2');
        // Without word before
        result = result.replace(/=\s+=\s*/g, ' == ');
        result = result.replace(/=\s+=(\w)/g, ' == $1');
        result = result.replace(/!\s+=\s*/g, ' != ');
        result = result.replace(/!\s+=(\w)/g, ' != $1');

        console.log(`Result:   "${result}"`);
    });
}

testRegex();
