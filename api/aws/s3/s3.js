const aws = require('aws-sdk');

module.exports = {
    instantiateS3(bucket) {
        const s3 = new aws.S3();
        const response = s3.listObjectsV2({
            Bucket: bucket,
            Prefix: 'public/avatars/'
        }, (err, data) => {
            console.log(data);
        });
    }
};
