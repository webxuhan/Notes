var express = require("express");

var app = express();
var admin = express();

admin.on('mount', function ( parent ) {
	console.log('Admin Mounted');
	console.log(parent); //打印app函数内的所有方法和属性
});


admin.get('/', function (req, res) {
	res.send('Admin Homepage');
});

app.use('/admin', admin);

var server = app.listen(1313,function () {
	var host = server.address().address;
	var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});