import axios from 'axios';

import {
    USER_LOGIN,
    BASE_URL_V1,
    CREATE_ORGANISATION,
    CREATE_USER
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


export const AddOrganisationApi = async (name, logo, id, token) => {
    let payload = {
        "name": name,
        "logo": logo,
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    console.log("ahahah")
    return axios.post(BASE_URL_V1 + CREATE_ORGANISATION + id, payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}

export const CreateUserApi = async (email, password, id, token) => {
    let payload = {
        "email": email,
        "password": password
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    console.log(email, password, id)
    return axios.post(BASE_URL_V1 + CREATE_USER + id, payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}

export const AddUserOrgApi = async (organisationID, userID, id, token) => {
    let payload = {
        "organisationID": organisationID,
        "userID": userID,
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.post(BASE_URL_V1 + "organisation/" + id + "/addUser", payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}


export const SetAdminOrgApi = async (admin, id, paramId, token) => {
    let payload = {
        "admin": admin,
        "id": id,
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.post(BASE_URL_V1 + "organisation/setadmin/" + paramId, payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}


export const GetOrganisationDetailsApi = async (id, token) => {

    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.get(BASE_URL_V1 + "organisation/" + id, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}


export const GetContentApi = async (id, userID, token) => {

    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.get(BASE_URL_V1 + "organisation/content/" + id + "/" + userID, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}

export const PostContentApi = async (data, id, userID, token) => {
    let payload = {
        "data": data
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.post(BASE_URL_V1 + "organisation/content/" + id + "/" + userID, payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}


export const RemoveUserFromOrgApi = async (organisationID, userID, id, token) => {
    let payload = {
        "organisationID": organisationID,
        "userID": userID,
    }
    const headersPayload = {
        "Authorization": `Bearer ${token}`,
        "crossDomain": true,
    };
    return axios.post(BASE_URL_V1 + "organisation/" + id + "/removeUser", payload, {
        "headers": headersPayload,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}


export const SendOTP = async (email) => {
    let payload = {
        "email": email,
    }
    return axios.post(BASE_URL_V1 + "otp/send", payload, {
        "headers": headers,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}

export const VerifyOtp = async (email, otp, hash) => {
    let payload = {
        "email": email,
        "otp": otp,
        "hash": hash
    }
    return axios.post(BASE_URL_V1 + "otp/verify", payload, {
        "headers": headers,
        "crossDomain": true,
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error;
    });
}
