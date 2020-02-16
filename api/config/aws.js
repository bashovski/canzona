exports.getAWSCredentials = () => {
    return {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    };
};

exports.getSESCredentials = () => {
    return {
        aws: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            ses: {
                from: {
                    default: `"Canzona.io" ${process.env.AWS_SES_EMAIL}`
                },
                region: process.env.AWS_REGION
            }
        }
    }
};
