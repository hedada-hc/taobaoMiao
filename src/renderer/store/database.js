var fs = require("fs");
var file = process.env.PWD + "/" + "config.db";
var exists = fs.existsSync(file);

if(!exists){
	console.log("creating db file.");
	fs.openSync(file,"w");
}

// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(file);
// console.log(db)