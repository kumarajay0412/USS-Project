import axios from 'axios';

import {
    USER_LOGIN,
    BASE_URL_V1,
} from '../constants/endpoints';

const headers = {
    'Content-Type': 'application/json',
};
const api_timeout = 15000;





export const LoginApi = async (email, password) => {
    let payload = {
        "email": email,
        "password": password
    }
    return axios.post(BASE_URL_V1 + USER_LOGIN, payload, {
        "headers": headers,
        "crossDomain": true,
        "timeout": api_timeout
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}

