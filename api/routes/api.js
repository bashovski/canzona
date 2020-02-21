let routers = [
        'users'
    ];

module.exports = {
    initialize(appInstance) {
        console.log('[canzona-api]: initializing endpoints for the router.');

        for(let i = 0, len = routers.length; i < len; i++) {
            appInstance.use(`/${routers[i]}`, require(`./${routers[i]}/${routers[i]}`));
        }
    }
};
