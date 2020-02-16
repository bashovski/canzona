const aws = require('aws-sdk');
const config = require('../config/aws');
const s3 = require('./s3/s3');

module.exports = () => {
    aws.config.setPromisesDependency(null);
    aws.config.update(config.getAWSCredentials());
    s3.instantiateS3('canzona');
    console.log(`[canzona-api]: S3 mounted successfully.`);
};
