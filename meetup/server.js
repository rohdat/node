var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 8888 ;


app.get('/', (req,res) => {
  res.sendFile(__dirname+'/client/views/index.html');
});

app.use ('/js', express.static(__dirname+'/client/js'));

app.listen(port, () => {
  console.log('Listening on port'+port);
})