const operations = require('./functions');

function main() {
    let numero1 = 10;
    let numero2 = 40;

    const resultSum = operations.sum(numero1, numero2)
    const resultSubs = operations.substract(numero1, numero2)
    const resultMult = operations.multiply(numero1, numero2)
    const resultDiv = operations.divide(numero1, numero2)

    console.log('suma: ', resultSum);
    console.log('resta: ', resultSubs);
    console.log('multiplicación: ', resultMult);
    console.log('división: ', resultDiv);
}

main();