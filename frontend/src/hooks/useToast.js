import React, { useState } from 'react'
import Toast from '../components/Toast';
export const useToast = () => {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [visibility, setVisibility] = useState("hide");

    const showToast = (message, type) => {
        setMessage(message);
        setType(type);
        setVisibility("show");
    };

    const hideToast = () => {
        setVisibility("hide");
        setMessage("");
        setType("");
    };

    const ToastWrapper = () => (
        <>
            {visibility === "show" && <Toast message={message} type={type} visibility={visibility} />}
        </>
    );

    return {
        showToast,
        hideToast,
        ToastWrapper
    };
};
