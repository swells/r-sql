var express = require('express');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var app = express();

app.set('view engine', 'jade');

//
// DB Connection
//
var con = new Connection({
	userName: 'USERNAME',
    password: 'PASSWORD',
    server: 'yourserver.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    //options: { encrypt: true, database: 'RevoPerfTestDB' }
});

con.on('connect', function(err) {
	console.log('DB Connection ' + (err ? '~~~ Failure ~~~' : 'Success'));
});

//
// Put your routes here
//
app.get('/', function (req, res) {
	request = new Request('select model from models where id = 42', function(err, rowCount) {
		console.log(err)
	});
	con.execSql(request);
                    
	res.render('index', { title: 'R SQL', message: 'Hello there!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});