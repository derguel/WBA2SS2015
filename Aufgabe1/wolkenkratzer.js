var fs = require('fs');
fs.readFile(__dirname + "/wolkenkratzer.json", 'utf8', function (err, data){
    if (err) {
        console.log('Error: ' + err); return;
    }
    var str = JSON.parse(data.toString());
    str.wolkenkratzer.forEach(function(entry){
        console.log('\nName:' + entry.name + '\nStadt:' + entry.stadt + '\nHoehe:' + entry.hoehe + 'm' + '\n\n--------------------'); 
    });
});