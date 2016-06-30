var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 8888 
    meetupController = require('./server/controllers/meetup-controller'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean-demo');


app.get('/', (req,res) => {
  res.sendFile(__dirname+'/client/views/index.html');
});

app.use(bodyParser());
app.use ('/js', express.static(__dirname+'/client/js'));

app.get('/api/meetups', meetupController.list);
app.post('/api/meetups', meetupController.create);

app.listen(port, () => {
  console.log('Listening on port'+port);
})