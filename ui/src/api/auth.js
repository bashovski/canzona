import axios from 'axios';

export default {
    login(step, email, password) {
        return axios.post(`http://localhost:8000/users/login`, {
            step: step,
            email: email,
            password: password
        });
    },
    register(email, name, surname, username, password) {
        return axios.post(`http://localhost:8000/users/register`, {
            email: email,
            name: name,
            surname: surname,
            username: username,
            password: password
        });
    },
    authenticate(jwt) {
        return axios.get(`http://localhost:8000/users/authenticate`, {
            headers: {
                Authorization: jwt
            }
        });
    },
    requireVerificationEmail(jwt) {
        return axios.post(`http://localhost:8000/verifications/resend`, {}, {
            headers: {
                Authorization: jwt
            }
        });
    }
}
