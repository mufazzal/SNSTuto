#!/usr/bin/env node
const { spawnSync} = require('child_process');
const {config, buildArgsString} = require('../config');
const path = require("path")

const getLogs = (args) => {

    return new Promise((resolve, reject)=>{

        const root = process.cwd();
        const [functionName] = args

        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd",)
        const getLogsComand = `logs --function ${functionName}` + buildArgsString(args);;

        console.log('Log command ->  ', pathToSls + ' ' + getLogsComand)
        console.log('Getting Logs..')
    
        const getLogsProcess = spawnSync(pathToSls, getLogsComand.split(' '));
        if (getLogsProcess.error && getLogsProcess.error.toString('utf8')) {
            reject({sucess: false, error: getLogsProcess.error.toString('utf8')})
        }
        if (getLogsProcess.stderr && getLogsProcess.stderr.toString('utf8')) {
            reject({sucess: false, error: getLogsProcess.stderr.toString('utf8')})
        }
        if (getLogsProcess.stdout && getLogsProcess.stdout.toString('utf8')) {
            console.log(getLogsProcess.stdout.toString('utf8'))
            resolve({sucess: true, message: getLogsProcess.stdout.toString('utf8')})
        }

    })

}

module.exports = getLogs; 