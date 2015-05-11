var chalk = require('chalk');
var fs = require('fs');
fs.readFile(__dirname + "/wolkenkratzer.json", 'utf8', function (err, data){
    if (err) {
         console.log('Error: ' + err); 
        return;
    }
    var str = JSON.parse(data.toString());

str.wolkenkratzer.sort(function(a,b){
    if (a.hoehe > b.hoehe) {
        return 1; 
    }
    return 0; 
});
    fs.writeFile(__dirname + "/wolkenkratzer_sortiert.json", JSON.stringify(str), function(err, data){ 
        if (err){
        console.log('Error' + err);
        return;
        }
        console.log("Datei wurde gesichert.");
    });

str.wolkenkratzer.forEach(function(entry){
    console.log(chalk.blue('\nName:' + entry.name) + chalk.red('\nStadt:' + entry.stadt) + chalk.green('\nHoehe:' + entry.hoehe + ' m') + '\n\n--------------------'); 
    });
});