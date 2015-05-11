var chalk = require('chalk');
var fs = require('fs');
fs.readFile(__dirname + "/wolkenkratzer.json", 'utf8', function (err, data){
    if (err) {
        console.log('Error: ' + err); return;
    }
var dez = JSON.parse(data.toString());

dez.wolkenkratzer.forEach(function(entry){
        console.log('\nName:' + entry.name);
        console.log('\nStadt:' + entry.stadt);
        console.log('\nHoehe:' + entry.hoehe);
        console.log('\n\n--------------------');
    });
});
