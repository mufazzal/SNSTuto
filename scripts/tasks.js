// const validate = require('./validate');
const deploy = require('./deploy');
const runFunction = require('./runFunction');
const deleteStack = require('./delete');
const package = require('./package');
const getLogs = require('./getLogs');
const updateFun = require('./updateFun');


const clean = require('./clean');

const args = process.argv.slice(2); 

doTask(args[0], args.slice(1));


function doTask (todo, taskArgs) {
    switch (todo) {
        case 'updateFun':
            updateFun(taskArgs)
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;
        case 'deploy':
            clean(taskArgs)
            .then( res => package(taskArgs))
            .then( res => deploy(taskArgs))
            .then(res => console.log(res))
            .catch( err => console.log(err))

        break;
        case 'runFunction':
            runFunction(taskArgs)
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;        
        case 'delete':
            deleteStack(taskArgs)
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;            
        case 'package':
            clean(taskArgs)
            .then(res => package(taskArgs))
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;  
        case 'getLogs':
            getLogs(taskArgs)
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;  
        case 'clean':
            clean(taskArgs)
            .then(res => console.log(res))
            .catch( err => console.log(err))
        break;            
            
        
        default:
            break;
    }
    
}

