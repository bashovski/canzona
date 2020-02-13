const JWT_ITEM_KEY = '__canzona-auth-jwt';

module.exports = {
    getAccessToken() {
        return window.localStorage.getItem(JWT_ITEM_KEY);
    },
    setAccessToken(jwt) {
        return window.localStorage.setItem(JWT_ITEM_KEY, jwt);
    }
};
