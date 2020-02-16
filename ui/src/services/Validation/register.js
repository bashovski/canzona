module.exports = {
    validationErrors: {
        email: `Invalid e-mail provided.`,
        name: `You 've provided invalid name.`,
        surname: `You 've provided invalid surname.`,
        username: `Invalid username provided, it has to be at least 8 characters long.`,
        password: `You 've provided invalid password which should be between 6 and 24 characters long.`
    },
    errors: {
        email: `An account with that email already exists. Maybe you need to log back in.`,
        name: `You 've provided invalid name. Please try again.`,
        surname: `You 've provided invalid surname. Please try again.`,
        username: `An account with provided username already exists.`,
        password: `You 've provided invalid password which should be between 6 and 24 characters long.`
    }
};
