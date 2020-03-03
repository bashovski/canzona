const aws = require('aws-sdk');
const ses = new aws.SES();

const welcomeTemplate = require('./templates/welcome');

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
    },
    sendVerificationEmail(to, name, verificationKey) {
        return this.sendEmail(to, 'Welcome to Canzona!', welcomeTemplate(name, `http://localhost:3000/verify/${verificationKey}`));
    },
    sendRecoveryEmail(to, name, recoveryKey) {
        return this.sendEmail(to, 'Account Recovery', welcomeTemplate('asd', 'asd'));
    }
};
