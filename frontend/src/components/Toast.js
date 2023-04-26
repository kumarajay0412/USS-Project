
/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ type, message, duration }) => {
    useEffect(() => {
        const options = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            icon: true,
            toastId: 'custom-id-yes',
        };
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            default:
                toast.info(message, options);
        }
    }, [message, duration, type]);

    return <ToastContainer className="foo" style={{ marginBottom: '10rem', borderRadius: '5rem' }} />;
};

Toast.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info']),
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
};

Toast.defaultProps = {
    type: 'info',
    duration: 3000,
};

export default Toast;
