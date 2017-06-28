var express = require("express");
var app = express(); //主程序
var admin = express(); //子程序


admin.get('/', function (req, res) {
	console.log("12:",admin.mountpath); //  ['/adm*n','/manager']
	res.send('admin homepage');
});
var secret = express();
secret.get('/', function (req, res) {
	console.log(secret.mountpath);  // /secr*t
	res.send('Admin secret');
});

admin.use('/secr*t',secret);
app.use(['/adm*n','/manager'], admin);
app.delete(['/adm*n','/manager'],admin);

var server = app.listen(1313,function () {
	var host = server.address().address;
	var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});