#!/usr/bin/env node
const { spawn, spawnSync} = require('child_process');
const {config, buildArgsString} = require('../config');
const path = require("path")

const root = process.cwd();


const deleteStack = (args) => {

    return new Promise((resolve, reject)=>{
        const [functionName, from] = args

        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd",)
        const deleteComand = `remove` + buildArgsString(args);

        console.log('Run Delete command ->  ', pathToSls + ' ' + deleteComand)
        console.log('Delete in progress..')

        const deleteProcess = spawnSync(pathToSls, deleteComand.split(' '));
        if (deleteProcess.error && deleteProcess.error.toString('utf8')) {
            reject({sucess: false, error: deleteProcess.error.toString('utf8')})
        }
        if (deleteProcess.stderr && deleteProcess.stderr.toString('utf8')) {
            reject({sucess: false, error: deleteProcess.stderr.toString('utf8')})
        }
        if (deleteProcess.stdout && deleteProcess.stdout.toString('utf8')) {
            console.log(deleteProcess.stdout.toString('utf8'))
            resolve({sucess: true, message: deleteProcess.stdout.toString('utf8')})
        }
    });

}
module.exports = deleteStack; 