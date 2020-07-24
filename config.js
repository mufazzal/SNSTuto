const cloudConfig = require("./cloudConfig")

const config = {
    outDir: "output",
    iamProfile: "Mufazzal_Hussain"
}

const buildArgsString = (args) => {

    return ` --stage ${cloudConfig.stage} --region ${cloudConfig.region} --userPoolArn ${cloudConfig.userPoolArn} --commonLibArn ${cloudConfig.commonLibArn} --userTableArn ${cloudConfig.userTableArn} --iamProfile ${config.iamProfile}`;
}

const buildRunFunEnvString = (args) => {

    const [functionName] = args
console.log(args)
    switch (functionName) {
        case "subscribeSNSFeed":
            return ` --env FeedSNSTopicARN=${cloudConfig.feedSNSTopicARN} --env FeedSNSDLQArn=${cloudConfig.FeedSNSDLQArn}`
        case "sendSNSFeed":
            return ` --env FeedSNSTopicARN=${cloudConfig.feedSNSTopicARN}`    
        case "unSubscribeSNSFeed":
            return ` --env FeedSNSTopicARN=${cloudConfig.feedSNSTopicARN}`    
        
        default:
            return ''
    }

}



module.exports = {config, buildArgsString, buildRunFunEnvString};