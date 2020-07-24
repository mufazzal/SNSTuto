const STAGE = "dev";
const REGION = "us-east-1";
const AWSROOTACCID = "388412347424";

const cloudConfig = {
    stage: STAGE,
    region: REGION,
    userPoolArn: `arn:aws:cognito-idp:${REGION}:${AWSROOTACCID}:userpool/${REGION}_d8rcMtMXj`,
    commonLibArn: `arn:aws:lambda:${REGION}:${AWSROOTACCID}:layer:commonLibs:6`,
    userTableArn: `arn:aws:dynamodb:${REGION}:${AWSROOTACCID}:table/${USERTABLENAME}`,
    feedSNSTopicARN: `arn:aws:sns:${REGION}:${AWSROOTACCID}:SNSFeed-${STAGE}`,
    FeedSNSDLQArn: `arn:aws:sqs:${REGION}:${AWSROOTACCID}:SNSFeedDLQ-${STAGE}`
};

module.exports = cloudConfig;