// server/aws-config.js
const AWS = require('aws-sdk');

function configureAWS() {
    // AWS configuration logic here
    AWS.config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    
    console.log("AWS configured successfully");
}

module.exports = configureAWS;

