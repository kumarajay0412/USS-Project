import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../hooks/useToast';
import FormInputComponent from '../components/FormComponents/InputComponent';
import { UserAtom } from '../states/userAtom';
import { useRecoilState } from 'recoil';
import { AddOrganisationApi, CreateUserApi, AddUserOrgApi, SetAdminOrgApi } from '../services/Api';
function AddOrganisation() {
    const { showToast, hideToast, ToastWrapper } = useToast();
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email').required("Required"),
        password: yup.string().required("Required"),
        name: yup.string().required("Required"),
        logo: yup.string().required("Required"),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = async (data) => {
        try {
            const response = await AddOrganisationApi(data.name, data.logo, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
            if (response?.status === 200) {
                showToast("Organisation created Successful", "success");
                const userCreateResponse = await CreateUserApi(data.email, data.password, userAtom?.user?.user?._id, userAtom?.user?.auth_token);

                if (userCreateResponse?.status === 200) {
                    showToast("User created Successful", "success");
                    setTimeout(hideToast, 3000);
                    const addUserOrgResponse = await SetAdminOrgApi(userCreateResponse?.data?.user, response?.data?._id, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
                    // if (addUserOrgResponse?.status === 200) {
                    //     showToast("User added to organisation Successful", "success");
                    //     setTimeout(hideToast, 3000);
                    // }
                    // else {
                    //     showToast("Request Failed pls try again");
                    //     setTimeout(hideToast, 3000);
                    // }
                }
                else {
                    showToast("Request Failed pls try again");
                    setTimeout(hideToast, 3000);
                }
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
        catch (error) {
            showToast("Request Failed pls try again");
            setTimeout(hideToast, 3000);
        }
    }

    return (
        <div className=' w-full justify-items-center items-center justify-center flex'>
            <form className="max-w-[330px] flex flex-col" id="email-form" onSubmit={handleSubmit(onSubmit)}>
                <FormInputComponent
                    label='Company Name'
                    type='text'
                    name='name'
                    placeholder='Type Company Name '
                    control={control}
                    error={errors?.name?.message}
                    required={true}
                />
                <FormInputComponent
                    label='Company logo'
                    type='text'
                    name='logo'
                    placeholder='Enter comapny logo link '
                    control={control}
                    error={errors?.logo?.message}
                    required={true}
                />
                <FormInputComponent
                    label='Company description'
                    type='text'
                    name='description'
                    placeholder='Enter comapny description here '
                    control={control}
                    error={errors?.description?.message}
                    required={true}
                />
                <FormInputComponent
                    label='Admin Email'
                    type='email'
                    name='email'
                    placeholder='Type your email '
                    control={control}
                    error={errors?.email?.message}
                    required={true}
                />
                <FormInputComponent
                    label='Admin Password'
                    type='password'
                    name='password'
                    placeholder='Type your password '
                    control={control}
                    error={errors?.password?.message}
                    required={true}
                />
                <button type='submit' form='email-form' className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                    Add Organization
                </button>
            </form>
            <ToastWrapper />
        </div>
    )
}

export default AddOrganisation