const e = require('express');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function setStringHdp() {
    readInterface.question('input ', num => {

        if (num == 'exit')
            return readInterface.close();
        else {
            let numMax;
            let numMin;
            let numDe;
            var number = (isNaN(num)) == true ? 0 : Number(num);

            //Decimal
            if (((number - Math.floor(number)) !== 0) == true && countDecimals(number) > 1) {
                numMax = (number + 0.25);
                numMin = (number - 0.25);
                console.log(`output ${numMin} / ${numMax}`);
            }
            else if (number == 0) {
                console.log(`output ${number}`);
            }
            else {
                numDe = parseFloat(number).toFixed(1)
                console.log(`output ${numDe}`);
            }
            recursiveAsyncReadLine();
        }
    });
}

recursiveAsyncReadLine();

function countDecimals(value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}



