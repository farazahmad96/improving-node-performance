const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        //event loop is blocked...
    }
}

app.get('/', (req, res) => {
    // JSON.stringify() //takes js obj and return string rep
    // JSON.parse() //takes stringfy obj and return corrisponding obj
    //[4,2,6,1,5].sort() //can block
    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    //delay the response
    delay(9000);
    res.send(`Ding ding ding! ${process.pid}`);
});

console.log('Running server.js...');
if (cluster.isMaster) {
    console.log('Master has been started..');
    const NUM_WORKERS = os.cpus().length;
    for (i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log('Worker process started');
    app.listen(3000);
}