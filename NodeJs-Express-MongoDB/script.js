const fs = require('node:fs');

console.log("Start of the script");

// Blocking call
// const content = fs.readFileSync('./sample.txt', 'utf-8');
// console.log(content);

// Non-blocking call
fs.readFile('./sample.txt', 'utf-8', function(err, data){
    if(!err) console.log(`file data: ${data}`);
});

console.log("End of the script");