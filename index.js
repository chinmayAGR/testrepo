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


 //client.connect(function (err){
 //	if(err)
 //	console.log(err);
 //	else
 //	console.log("Connected!");


//client.query("INSERT INTO eatosalesforce.service_now__c (Description__c) VALUES ($1)", ['Test'], (err, res) => {
// 
// if (err) throw err;
// else
// console.log(res);
//
// //client.end();
//
// }); 

	//client.query('SELECT * FROM eatosalesforce.service_now__c;', (err, res1) => {
	//	if (err) throw err;
	//	else
	//		console.log(res1.rows.length)
	//	//for (let row of res1.rows) {
	//		//console.log(JSON.stringify(row['Description__c']));
	//	//}
    //
	//	client.end();
	//});
//});

//console.log('hello World')
let connectionString = {
	url: "https://dev18128.service-now.com/api/now/table/incident",
	headers: { "Authorization": authenticationHeader }
}



let firstConnection = (data) => {

	return new Promise((resolve, reject) => {

		request(data, function (error, response, body) {
			if(error) reject(error);

		resolve(JSON.parse(body));
			// myData = (JSON.parse(body));
			//console.log("@@@mydata : "+JSON.stringify(myData));
		});

	});

}

firstConnection(connectionString).then(
	body => {
	let myData = body.result;
	
	client.connect(function (err){
		if(err)
		console.log(err);
		else
		console.log("Connected!");
		console.log(myData[59]);
		
		myData.map(element=>{
			
			client.query("INSERT INTO eatosalesforce.service_now__c (Description__c,Category__c,Impact__c,Reason__c,Sub_Category__c,Ticket_Number__c) VALUES ($1,$2,$3,$4,$5,$6)", [element.short_description,element.category,element.imapct,element.hold_reason,element.subcategory,element.number], (err, res) => {
        
			if (err) throw err;
			
			else
				
			console.log(res);
			
			
		
			});
		})

		 
		
		
		
})
	}
).catch(
	error => console.log(error)
);