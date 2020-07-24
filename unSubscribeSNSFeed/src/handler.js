'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.unSubscribeSNSFeed = async (event, context) => {
	try{
		const sns = new AWS.SNS({apiVersion: '2010-03-31'});

		const userData = {
			claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
		}	
		
		const subscriptionClients = JSON.parse(event.body);
		
		const snsResult = {};
		var params = {
			TopicArn: process.env.FeedSNSTopicARN
		  };
		const allSubsToTopic = await sns.listSubscriptionsByTopic(params).promise();
		console.log('---->', allSubsToTopic)
		allSubsToTopic.Subscriptions.forEach(sub => {
			if(subscriptionClients.email && sub.Protocol === 'email' && subscriptionClients.email === sub.Endpoint) {
				snsResult.email = sns.unsubscribe({SubscriptionArn: sub.SubscriptionArn})
			}
			if(subscriptionClients.phone && sub.Protocol === 'sms' && subscriptionClients.phone === sub.Endpoint) {
				snsResult.sms = sns.unsubscribe({SubscriptionArn: sub.SubscriptionArn})

			}
		});
		
		console.log('snsResult', snsResult)
		
		var response = { 	
					statusCode: 200, 
					body: JSON.stringify({result: ''}),
					headers: {'Access-Control-Allow-Origin': '*'}
		}; 
	}catch(e) {
		 response = { 	
					statusCode: 500, 
					body: JSON.stringify({error: e.message}),
					headers: {'Access-Control-Allow-Origin': '*'}
		 }
	}
	
	return response;
};
