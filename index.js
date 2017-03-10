var config = require('./config.js');
var flock = require('flockos');
var express = require('express');

flock.appId = config.appId;
flock.appSecret = config.appSecret;

var app = express();
app.use(flock.events.tokenVerifier);
app.post('/events',flock.events.listener);

app.get('*', function(req, res) {
	res.sendfile('./index.html');
});

app.listen(8000, function(){
	console.log("listening at 8000");
})

flock.events.on('app.install', function(event,callback){
	console.log('ole: ',event);
	callback();
});

flock.events.on('client.slashCommand',function(event,callback){
	var name = event.text;
	if(name) {
		console.log(name);
		callback(null, {text:"Hack added"});
	}
	else {
		callback(null, {text:"Hack failed"});
	}
});