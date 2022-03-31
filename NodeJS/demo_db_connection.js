
var mysql = require('mysql');


var con = mysql.createConnection({
	host: "egr325-sp-2021.c74gjtosws7c.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "password",
	database: "ap"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	
	con.query("SELECT * FROM invoices;", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
});