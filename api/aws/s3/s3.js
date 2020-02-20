const aws = require('aws-sdk');
const fs = require('fs');
const buckets = require('./buckets');
const isImage = require('is-image');
const files = require('../../services/crypt/files');

const s3 = new aws.S3();

module.exports = {
    instantiateS3(bucket) {
        /*const response = s3.listObjectsV2({
            Bucket: bucket,
            Prefix: 'public/avatars/'
        }, (err, data) => {
            console.log(data);
        });*/
    },

    uploadFile(fileName, salt) {
        const fileContent = fs.readFileSync(fileName);
        if(!isImage(fileName)) throw 'invalid file passed';

        files.generateHash(salt, (hash) => {
            const delimited = fileName.split('.');

            s3.upload({
                Bucket: 'canzona',
                Key: `${hash}.${delimited[delimited.length - 1]}`,
                Body: fileContent
            }, (err, data) => {
                if(err) throw err;
                console.log('successfully uploaded photo', data);
            });
        });
    }
};
