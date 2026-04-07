const express = require('express')
const PORT = 8000;
const app = express();

app.get('/', function(req, res){
    res.end('HomePage');
})

app.get('/contact-us', function(req, res){
    res.end('You can contact me.')
})

app.post('/tweet', function(req, res){
    res.status(200).end("Tweet created");
})

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
