'use strict';
var AWS = require('aws-sdk');
var moment = require('moment');


exports.lambdaSnsSubscriber = async (event, context) => {
	try{

		const userData = {
			claims: event.requestContext && event.requestContext.authorizer ? event.requestContext.authorizer.claims : ''
		}	
		console.log(event.Records[0], event.Records[0].sns,  context);
		
		// const body = context.isLocal ? event.body : JSON.parse(event.body);
		// console.log(body);

	} catch(err) {
		console.log(err)
	}
	
};
