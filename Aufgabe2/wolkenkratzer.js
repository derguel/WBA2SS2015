var chalk = require('chalk');
var fs = require('fs');
fs.readFile(__dirname + "/wolkenkratzer.json", 'utf8', function (err, data){
    if (err) {
        console.log('Error: ' + err); return;
    }
var dez = JSON.parse(data.toString());

dez.wolkenkratzer.forEach(function(entry){
        console.log(chalk.blue('\nName:' + entry.name));
        console.log(chalk.red('\nStadt:' + entry.stadt));
        console.log(chalk.green('\nHoehe:' + entry.hoehe));
        console.log('\n\n--------------------');
    });
});
