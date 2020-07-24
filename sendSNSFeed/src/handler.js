'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.sendSNSMFeed = async (event, context) => {
	try{
		const sns = new AWS.SNS({apiVersion: '2010-03-31'});

		const userData = {
			claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
		}	

		const body = JSON.parse(event.body);

		var params = {
			TopicArn: process.env.FeedSNSTopicARN,
			MessageStructure: 'json',
			Message: JSON.stringify({
				default: 'Hello from SNS default - ' + body.message.text,
				sms: 'Hello from SNS - SMS - ' + body.message.text,
				email: 'Hello from SNS - Email - ' + body.message.text,
				HTTP: 'Hello from SNS - HTTP - ' + body.message.text,
				HTTPS: 'Hello from SNS - HTTPS - ' + body.message.text,
			})
		};

		const snsResult = await sns.publish(params).promise();

		console.log("moment date ->>> ", moment(new Date()).format('MM/DD/YYYY'));

		var response = { 	
					statusCode: 200, 
					body: JSON.stringify({result: '',  userData: userData, snsResult: snsResult}),
					headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	} catch(err) {
		console.log(err)
		response = { 	
			statusCode: 500, 
			body: JSON.stringify({error: err.message}),
			headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	}
	
	
	return response;
};
