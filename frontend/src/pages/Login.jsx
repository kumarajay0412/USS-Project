import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../hooks/useToast';
import FormInputComponent from '../components/FormComponents/InputComponent';
import { LoginApi, SendOTP, VerifyOtp } from '../services/Api';
import { UserAtom } from '../states/userAtom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);
    const [hash, setHash] = useState("");
    const { showToast, hideToast, ToastWrapper } = useToast();
    let navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email').required("Required"),
        password: yup.string().required("Required"),
        otp: yup.string().required("Required"),
    });

    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            const verifyOtpResponse = await VerifyOtp(data.email, data.otp, hash);
            if (verifyOtpResponse?.data?.verified) {

                const response = await LoginApi(data.email, data.password);
                if (response?.status === 200) {
                    showToast("Login Successful", "success");
                    setUserAtom({ ...userAtom, loggedIn: true, user: response?.data })
                    navigate('/home')

                }
                else if (response?.status === 400) {
                    showToast("Invalid Credentials", "error");
                    setTimeout(hideToast, 3000);
                }
                else {
                    showToast("Request Failed");
                    setTimeout(hideToast, 3000);
                }
            }
            else {
                showToast("Invalid Otp", "error");
                setTimeout(hideToast, 3000);
            }


        }
        catch (error) {
            showToast("Request Failed");
            setTimeout(hideToast, 3000);
        }
    }
    const sendOTPFunction = async () => {
        console.log(getValues("email"))
        if (getValues("email") !== "" || getValues("email") !== null) {
            try {
                const response = await SendOTP(getValues("email"));
                if (
                    response?.status === 200
                ) {
                    setHash(response?.data?.hash)
                    showToast("Otp Sent Successful", "success");
                    setTimeout(hideToast, 3000);
                }
                else {

                }
            }

            catch (error) {
                showToast("Otp Sent failed");
                setTimeout(hideToast, 3000);
            }
        }
    }



    return (<>
        <motion.div
            className="grid  md:grid-cols-2 grid-cols-1 h-[100vh] w-full items-center justify-around "
            animate={{ x: 0 }}
            initial={{ x: -300 }}
            transition={{ ease: 'easeOut', duration: 1 }}
        >
            <div className='hidden md:flex'>
                <img src="/Login_Page.svg" alt="image" className='h-[100vh] w-full object-cover' />

            </div>
            <div className='flex justify-items-center justify-center h-[100vh]'>
                <div className='flex justify-center flex-col h-full  w-[300px]'>
                    <div
                        className="font-normal font-inter  text-center lg:text-start text-[24px] text-black ">Welcome back

                    </div>
                    <div
                        className="font-bold font-inter  text-center lg:text-start text-[40px] text-black ">
                        Login to your account
                    </div>
                    <form id="email-form" onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-6'>
                        <FormInputComponent
                            label=' Email'
                            type='email'
                            name='email'
                            placeholder='Type your email '
                            control={control}
                            error={errors?.email?.message}
                            required={true}
                        />


                        <FormInputComponent
                            label=' Password'
                            type='password'
                            name='password'
                            placeholder='Type your password '
                            control={control}
                            error={errors?.password?.message}
                            required={true}
                        />
                        <FormInputComponent
                            label=' OTP'
                            type='text'
                            name='otp'
                            placeholder='Type your OTP '
                            control={control}
                            error={errors?.otp?.message}
                            required={true}
                        />

                        <button type='submit' className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                            Log In
                        </button>
                    </form>
                    <button onClick={() => { sendOTPFunction() }} className='w-full mt-4 px-[32px] md:w-auto rounded border-purple border-[1px] mb-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                        Send OTP
                    </button>

                </div>
            </div>


        </motion.div>
        <ToastWrapper />

    </>

    )
}

export default Login