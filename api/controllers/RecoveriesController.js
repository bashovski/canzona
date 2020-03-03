const Recovery = require('../models/Recovery');

module.exports = {
    deleteUserRecoveries(userId) {
        Recovery.deleteMany({
            user_id: userId
        }).then(resp => {
            return true;
        }).catch(err => {
            return false;
        });
    },
    recoveryRequestRedisKey(userId) {
        return `_recovery_request:${userId}`;
    },
    isValidRecoveryKey(key) {
        return new Promise((resolve, reject) => {
            Recovery.findOne({
                key: key
            }).then(recovery => {
                //console.log(recovery);
                resolve(recovery);
            }).catch(() => {
                reject();
            });
        });
    }
};
