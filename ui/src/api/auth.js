import axios from 'axios';

export default {
    login(step, email, password) {
        return axios.post(`http://localhost:8000/users/login`, {
            step: step,
            email: email,
            password: password
        });
    }
}
