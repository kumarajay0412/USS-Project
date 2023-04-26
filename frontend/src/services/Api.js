// /* eslint-disable no-unused-vars */
// import axios from 'axios';

// import {
//     SEND_OTP,
//     VERIFY_OTP,
//     BASE_URL_V1,
//     BASE_URL_V3,
//     AUTH_URL,
//     JD2SKILLS,
//     TEXT_DESCRIPTION,
//     CV2SKILLS,
//     GET_RETRAIN_DATA_NO_AUTH,
//     ROLE2SKILLS
// } from '../constants/endpoints';

// const headers = {
//     'Content-Type': 'application/json',
// };
// const api_timeout = 15000;



// export const SendOtp = async (email) => {
//     let payload = {
//         "email": email
//     }
//     return axios.post(BASE_URL_V1 + SEND_OTP, payload, {
//         "headers": headers,
//         "crossDomain": true,
//         "timeout": api_timeout
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });
// }


// export const checkAuth = async () => {
//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//         "timeout": api_timeout
//     };

//     return axios.get(AUTH_URL, {
//         headers: headersPayload
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });
// }

// export const rolesToSkills = async (fieldName, roleName) => {

//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//     };
//     let payload = {
//         "maxNumberOfSkills": "100",
//         "fieldName": fieldName,
//         "roleName": roleName
//     }
//     return axios.post(BASE_URL_V3 + ROLE2SKILLS, payload, {
//         "headers": headersPayload,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }


// export const jdToSkills = async (jobTitle, jobDescription) => {

//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//     };
//     let payload = {
//         "maxNumberOfSkills": "100",
//         "jobTitle": jobTitle,
//         "jobDescription": jobDescription
//     }
//     return axios.post(BASE_URL_V3 + JD2SKILLS, payload, {
//         "headers": headersPayload,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }

// export const cvToSkills = async (file) => {

//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//     };
//     const formData = new FormData();
//     formData.append("file", file, "resume.pdf");

//     return axios.post(BASE_URL_V3 + CV2SKILLS, formData, {
//         "headers": headersPayload,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });
// }

// export const textDescription = async (roleName) => {

//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//     };
//     let payload = {
//         "roleName": roleName,
//     }
//     return axios.post(BASE_URL_V1 + TEXT_DESCRIPTION, payload, {
//         "headers": headersPayload,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }


// export const VerifyOtp = async (email, otp, hash) => {
//     let payload = {
//         "email": email,
//         "otp": otp,
//         "hash": hash
//     }
//     return axios.post(BASE_URL_V1 + VERIFY_OTP, payload, {
//         "headers": headers,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });
// }

// export const GetRetrainData = async (ID) => {
//     return axios.get(BASE_URL_V3 + GET_RETRAIN_DATA_NO_AUTH + ID, {
//         "headers": headers,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }

// export const GetRolesAndFields = async () => {
//     return axios.get(BASE_URL_V1 + "roles", {
//         "headers": headers,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }

// export const SendEmailResults = async (email, link) => {

//     let jwtToken = "";
//     if (window.localStorage) {
//         jwtToken = window.localStorage.getItem('jwtToken');
//     }
//     const headersPayload = {
//         "Authorization": JSON.parse(jwtToken),
//         "crossDomain": true,
//     };
//     let payload = {
//         "email": email,
//         "link": link
//     }
//     return axios.post(BASE_URL_V1 + "mail/results", payload, {
//         "headers": headersPayload,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }


// export const SendFeedback = async (data) => {

//     return axios.post(BASE_URL_V1 + "feedback/add", data, {
//         "headers": headers,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }

// export const SendContactUs = async (data) => {

//     return axios.post(BASE_URL_V1 + "mail/contactus", data, {
//         "headers": headers,
//         "crossDomain": true,
//     }).then(function (response) {
//         return response;
//     }).catch(function (error) {
//         return error;
//     });

// }