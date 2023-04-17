const env = require('./environment');
const path = require('path');
const fs = require('fs');
module.exports = (app) =>{
    app.locals.assetPath = function (filePath) {
        if(env.name == 'development'){
            return filePath;
            console.log("DEVELOPMENT");
        } 
        console.log("PRODUCTION");
        return  '/'+ JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}