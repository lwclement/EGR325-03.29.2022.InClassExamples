var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql');

var app = express();
app.use(express.static('public')); //folder for static content (HTML, JavaScript, CSS)
app.listen(80); //port to listen on
app.use(bodyParser.json()); //parse submitted JSON
console.log('Listening on port 80');

var pool = mysql.createPool({
	connectionLimit : 10, // default = 10
	host            : "egr325-sp-2022.ceu7pci5ozyo.us-east-1.rds.amazonaws.com",
	user            : "admin",
	password        : "password",
	database        : "ap"
});

app.get('/invoice', function(req, res) {
	console.log("Invoice request: ALL invoices" + new Date()) ;
		
	var sql = "SELECT * FROM invoices;";
	console.log("Running request: " + sql + " " + new Date());
	
	pool.getConnection(function (err, connection) {
		connection.query(sql, function(err, rows) {
			connection.release();
			if (err) throw err;
			
			console.log("Retrieved " + rows.length + " rows");
			res.send(JSON.stringify(rows));
		});
	});
});

app.get('/invoice/:id', function(req, res) {
	console.log("Invoice request: " + req.params.id + " " + new Date()) ;
		
	var sql = "SELECT * FROM invoices WHERE invoice_id=" + req.params.id + ";";
	console.log("Running request: " + sql + " " + new Date());
	
	pool.getConnection(function (err, connection) {
		connection.query(sql, function(err, rows) {
			connection.release();
			if (err) throw err;
			
			console.log(rows.length);
			res.send(JSON.stringify(rows));
		});
	});
});