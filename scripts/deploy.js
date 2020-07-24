#!/usr/bin/env node
const { spawn, spawnSync} = require('child_process');
const {config, buildArgsString} = require('../config');
const path = require("path")

const deploy = (args) => {

    return new Promise((resolve, reject)=>{

        const root = process.cwd();
        const pathToOut = path.join(root, config.outDir)
        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd",)
        const deployComand = `deploy --package ${pathToOut}` + buildArgsString(args);

        console.log('deployment command ->  ', pathToSls + ' ' + deployComand)
        console.log('deploying..')

        const deployProcess = spawn(pathToSls, deployComand.split(' '));
        deployProcess.stdout.on('data', data => {
            console.log('stdout:', data.toString())
        })
        deployProcess.stderr.on('data', data => {
            console.log('stderr:', data.toString())
        })
        deployProcess.on('close', code => {
            console.log('Deployment exitd with code = ', code)
            if(code === 0) {
                console.log('Deployment Successful')
                resolve({success: true, message: `Deployment Successful` })
            }
            else {
                console.log('Deployment Failed')
                reject({success: true, false: `Deployment Failed` })   
            }         
        })


        // const deployProcess = spawnSync(pathToSls, deployComand.split(' '));
        // if (deployProcess.error && deployProcess.error.toString('utf8')) {
        //     reject({sucess: false, error: deployProcess.error.toString('utf8')})
        // }
        // if (deployProcess.stderr && deployProcess.stderr.toString('utf8')) {
        //     reject({sucess: false, error: deployProcess.stderr.toString('utf8')})
        // }
        // if (deployProcess.stdout && deployProcess.stdout.toString('utf8')) {
        //     console.log(deployProcess.stdout.toString('utf8'))
        //     console.log('----Deployment Initiated----')
        //     resolve({sucess: true, message: deployProcess.stdout.toString('utf8')})
        // }
    });

}
module.exports = deploy; 