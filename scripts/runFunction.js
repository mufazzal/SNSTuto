#!/usr/bin/env node
const { spawn, spawnSync} = require('child_process');
const {buildArgsString, buildRunFunEnvString} = require('../config');
const path = require("path")

const root = process.cwd();


const runFunction = (args) => {

    return new Promise((resolve, reject)=>{
        const [functionName, from] = args

        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd",)

        const runFunComand = `invoke${from === 'L' ? ' local' : ''} ` + 
            `--function ${functionName} ` +
            `--path ${functionName}/inputs/default.json ` + 
            `--contextPath ${functionName}/inputs/context.json` +
            buildArgsString(args) +
            (from === 'L' ? buildRunFunEnvString(args) : '');

        console.log('Run Function command ->  ', pathToSls + ' ' + runFunComand)
        console.log('Runing Function..')

        const runFunProcess = spawnSync(pathToSls, runFunComand.split(' '));
        if (runFunProcess.error && runFunProcess.error.toString('utf8')) {
            reject({sucess: false, error: runFunProcess.error.toString('utf8')})
        }
        if (runFunProcess.stderr && runFunProcess.stderr.toString('utf8')) {
            reject({sucess: false, error: runFunProcess.stderr.toString('utf8')})
        }
        if (runFunProcess.stdout && runFunProcess.stdout.toString('utf8')) {
            console.log(runFunProcess.stdout.toString('utf8'))
            resolve({sucess: true, message: runFunProcess.stdout.toString('utf8')})
        }
    });

}
module.exports = runFunction; 