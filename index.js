const request = require('request');
var pg = require('pg');
var pool = new pg.Pool()
var myData;
var username = "admin"; 
var password = "Abcd1234!";
var authenticationHeader = "Basic " + new Buffer(username + ":" + password).toString("base64");
const { Client } = require('pg');
var mysql = require('mysql');
var connection;

const client = new Client({
  connectionString: "postgres://awwdjptnkhqero:ecaa929e501c53b57dc9ee62b5c25b32e7b018ad957f1a1d71fa43c3bc6efd80@ec2-23-23-164-128.compute-1.amazonaws.com:5432/dl7ae9k9q3c17",
  ssl: true,
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Insert a record in the "customers" table:
  var sql = "INSERT INTO eatosalesforce.service_now__c (Description__c) VALUES ('Test')";
  client.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
//console.log(client.status);

client.query('SELECT * FROM eatosalesforce.service_now__c;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    //console.log(JSON.stringify(row));
  }
  client.end();
}); 

//console.log('hello World')

request({
	url : "https://dev18128.service-now.com/api/now/table/incident",
	headers : { "Authorization" : authenticationHeader }  
	},
	function (error, response, body) {
		myData = (JSON.parse(body));
		//console.log("@@@mydata : "+JSON.stringify(myData));
	}  
); 

