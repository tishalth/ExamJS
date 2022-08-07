var fs = require('fs');

function readLines(input, func) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

function func(data) {
    var lines = data.split("|");
    if (lines[3] != '') {
        console.log(lines[7] + ' ' + lines[8] + ' ' + lines[2] + ' ' + lines[3]);
    }
}

var input = fs.createReadStream('./20220530_readfile.txt');
readLines(input, func);
