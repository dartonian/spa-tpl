var express = require('express');
var app = express();
var path = require("path");

app.use('/js', express.static(__dirname + '/../build/js'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/../build', 'index.html'));
});

app.listen(4000);