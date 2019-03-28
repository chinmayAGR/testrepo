const request = require('request');
var pg = require('pg');
var pool = new pg.Pool()
var myData ;
var username = "admin"; 
var password = "Abcd1234!";
var connectionString = "postgres://awwdjptnkhqero:ecaa929e501c53b57dc9ee62b5c25b32e7b018ad957f1a1d71fa43c3bc6efd80@ec2-23-23-164-128.compute-1.amazonaws.com:5432/dl7ae9k9q3c17"
var authenticationHeader = "Basic " + new Buffer(username + ":" + password).toString("base64");

console.log('hello World')

request(   
	{
		url : "https://dev18128.service-now.com/api/now/table/incident",
		headers : { "Authorization" : authenticationHeader }  
	},
	function (error, response, body) {

		myData = (JSON.parse(body));
		console.log("@@@mydata : "+JSON.stringify(myData));
		//console.log(body.success);
		console.log(myData.result[0].number);
		var count = Object.keys(myData.result).length;
		console.log(count);
		var numberarr;
		var i;
		for(i = 0; i<count; i++){
			numberarr = myData.result[i].number;
			//console.log(numberarr[i]);
		}
		for(i = 0; i<1; i++){
			console.log(numberarr[i]);
		}
		DATABASE_URL : postgres://awwdjptnkhqero:ecaa929e501c53b57dc9ee62b5c25b32e7b018ad957f1a1d71fa43c3bc6efd80@db:5432/dl7ae9k9q3c17;
		myData.result.map(element=>(
			pool.connect(process.env.DATABASE_URL, function(err, client, done) {
				client.query('INSERT INTO Service_Now__c(Reason__c, Status__c, Ticket_Closed_On__c, Ticket_Number__c, Ticket_Opened_On__c, Ticket_Owner__c, Ticket_Raised_By__c, Urgency__c) VALUES (element.hold_reason, element.state , element.closed_at, element.number, element.sys_created_on, element.sys_created_by, element.sys_created_by, element.urgency)', 
				function(err, result) {
					done();
					 if(err) {
						return console.error(err);
						console.log(result.rows);
					}
				});
			})
		)) 
		
	/*  body.result.map(element=>(
	conole.log(element.parent))) */
	}  
);



/* pg.connect(process.env.DATABASE_URL, function(err, client, done) {
client.query('SELECT * FROM Service_Now__c', function(err, result) {
done();
if(err) return console.error(err);
console.log(result.rows);
});
}); */
