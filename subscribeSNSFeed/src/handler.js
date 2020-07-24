'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.subscribeSNSFeed = async (event, context) => {
	try{
		const sns = new AWS.SNS({apiVersion: '2010-03-31'});

		const userData = {
			claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
		}
		
		const subscriptionClients = JSON.parse(event.body);

		const snsResult = {};
		const attributes = {RedrivePolicy: JSON.stringify({deadLetterTargetArn: process.env.FeedSNSDLQArn})}
		if(subscriptionClients.email) {
			let params = {
				Protocol: 'EMAIL', 
				TopicArn: process.env.FeedSNSTopicARN,
				Endpoint: subscriptionClients.email,
				Attributes: attributes
			};
			snsResult.email = await sns.subscribe(params).promise();
		}
		if(subscriptionClients.phone) {
			let params = {
				Protocol: 'SMS', 
				TopicArn: process.env.FeedSNSTopicARN,
				Endpoint: subscriptionClients.phone,
				Attributes: attributes
			};
			snsResult.phone = await sns.subscribe(params).promise();
		}

		console.log("moment date ->>> ", moment(new Date()).format('MM/DD/YYYY'));

		var response = {
					statusCode: 200, 
					body: JSON.stringify({result: '',  userData: userData, snsResult: snsResult}),
					headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	} catch(e) {

		response = { 	
			statusCode: 500, 
			body: JSON.stringify({error: e}),
			headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	}
	
	
	return response;
};
