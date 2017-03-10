var config = require('./config.js');
var flock = require('flockos');
var express = require('express');

flock.appId = config.appId;
flock.appSecret = config.appSecret;

var app = express();
app.use(flock.events.tokenVerifier);
app.post('/events',function() {
	return 1;
});

app.listen(8000, function(){
	console.log("listening at 8000");
})

flock.events.on('app.install', function(event,callback){
	return true;
	callback();
});