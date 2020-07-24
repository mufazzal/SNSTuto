#!/usr/bin/env node
const { spawn, spawnSync} = require('child_process');
const {config, buildArgsString} = require('../config');
const path = require("path")

const updateFun = (args) => {

    return new Promise((resolve, reject)=>{

        const [functionName] = args
        const root = process.cwd();
        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd")
        const updateFunComand = `deploy --function ${functionName}` 
                                + buildArgsString(args);

        console.log('Update Function command ->  ', pathToSls + ' ' + updateFunComand)
        console.log('updating..')

        const updateFunProcess = spawn(pathToSls, updateFunComand.split(' '));
        updateFunProcess.stdout.on('data', data => {
            console.log('stdout:', data.toString())
        })
        updateFunProcess.stderr.on('data', data => {
            console.log('stderr:', data.toString())
        })
        updateFunProcess.on('close', code => {
            console.log('Update exitd with code = ', code)
            if(code === 0) {
                console.log('Update Successful')
                resolve({success: true, message: `Update Successful` })
            }
            else {
                console.log('Update Failed')
                reject({success: true, false: `Update Failed` })   
            }         
        })


        // const updateFunProcess = spawnSync(pathToSls, updateFunComand.split(' '));
        // if (updateFunProcess.error && updateFunProcess.error.toString('utf8')) {
        //     reject({sucess: false, error: updateFunProcess.error.toString('utf8')})
        // }
        // if (updateFunProcess.stderr && updateFunProcess.stderr.toString('utf8')) {
        //     reject({sucess: false, error: updateFunProcess.stderr.toString('utf8')})
        // }
        // if (updateFunProcess.stdout && updateFunProcess.stdout.toString('utf8')) {
        //     console.log(updateFunProcess.stdout.toString('utf8'))
        //     console.log('----updateFunment Initiated----')
        //     resolve({sucess: true, message: updateFunProcess.stdout.toString('utf8')})
        // }
    });

}
module.exports = updateFun; 