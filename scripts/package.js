#!/usr/bin/env node
const { spawn, spawnSync} = require('child_process');
const {config, buildArgsString} = require('../config');
const path = require("path")

const root = process.cwd();


const package = (args) => {

    return new Promise((resolve, reject)=>{

        const pathToSls = path.join(root, "node_modules/.bin/serverless.cmd",)
        const pathToOut = path.join(root, config.outDir)
        const packageComand = `package --package ${pathToOut}` + buildArgsString(args);

        console.log('Run package command ->  ', pathToSls + ' ' + packageComand)
        console.log('package in progress..')

        const packageProcess = spawn(pathToSls, packageComand.split(' '));
        packageProcess.stdout.on('data', data => {
            console.log('stdout:', data.toString())
        })
        packageProcess.stderr.on('data', data => {
            console.log('stderr:', data.toString())
        })
        packageProcess.on('close', code => {
            if(code === 0) {
                console.log(`Package created at : ${pathToOut}`)
                resolve({success: true, message: `Package created at : ${pathToOut}` })
            }
            else {
                console.log('Package creation failed')
                reject({success: true, false: `Package creation failed` })
            }
        })
    });

}
module.exports = package; 