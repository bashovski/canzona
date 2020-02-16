const aws = require('aws-sdk');
const ses = new aws.SES();

module.exports = {
    sendEmail(to, subject, message, from = process.env.AWS_SES_EMAIL) {
        const params = {
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: message
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            ReturnPath: from,
            Source: from
        };
        ses.sendEmail(params, (err, data) => {
            console.log('errors', err);
            console.log('data', data);
        })
    }
};
