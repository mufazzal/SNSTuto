var rimraf = require("rimraf");
const path = require("path")

const cleanStack = (args) => {

    return new Promise((resolve, reject)=>{
        const root = process.cwd();
        const pathToOutputDir = path.join(root, "output")
        rimraf.sync(pathToOutputDir);
        console.log(`output directorry is cleand!`);
        resolve({success: true, message: 'output directorry is cleand!'})
    });

}
module.exports = cleanStack; 
