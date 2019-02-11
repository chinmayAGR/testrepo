const request = require('request');
var username = "admin"; 
var password = "Abcd1234!";
var authenticationHeader = "Basic " + new Buffer(username + ":" + password).toString("base64");
console.log('hello World')
request(   
{
url : "https://dev18128.service-now.com/api/now/table/incident",
headers : { "Authorization" : authenticationHeader }  
},
 function (error, response, body) {
 console.log(body); }  );