import React, { useEffect, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import { AiOutlineUser } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import { BsFolder2Open } from 'react-icons/bs'
import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { UserAtom } from '../states/userAtom';
import { AiOutlineDelete } from 'react-icons/ai'
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import AddOrganisation from '../components/AddOrganisation'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../hooks/useToast';
import FormInputComponent from '../components/FormComponents/InputComponent';
import AddContent from '../components/AddContent';
import { AddUserOrgApi, GetContentApi, SetAdminOrgApi, CreateUserApi, AddOrganisationApi, RemoveUserFromOrgApi, GetOrganisationDetailsApi } from '../services/Api';

function Home() {
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);
    const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false)
    const [isOpenTeamDetailsModal, setIsOpenTeamDetailsModal] = useState(false)
    const [isOpenUserProfile, setIsOpenUserProfile] = useState(false)
    const [isOpenAddDirectory, setIsOpenAddDirector] = useState(false)
    const [contentData, setContentData] = useState([])
    const [showContentData, setShowContentData] = useState(false)
    const [selectedContent, setSelectedContent] = useState(null)

    const { showToast, hideToast, ToastWrapper } = useToast();
    const [organisationDetails, setOrganisationDetails] = useState(null)
    let navigate = useNavigate();


    useEffect(() => {
        if (!userAtom?.loggedIn) navigate('/login')
    }, [userAtom])


    function openAddUserModal() {
        setIsOpenAddUserModal(true)
    }

    function closeAddUserModal() {
        setIsOpenAddUserModal(false)
    }


    function openTeamDetailsModal() {
        setIsOpenTeamDetailsModal(true)
    }

    function closeTeamDetailsModal() {
        setIsOpenTeamDetailsModal(false)
    }

    function openUserProfile() {
        setIsOpenUserProfile(true)
    }

    function closeUserProfile() {
        setIsOpenUserProfile(false)
    }

    function openAddDirectory() {
        setIsOpenAddDirector(true)
    }

    function closeAddDirectory() {
        setIsOpenAddDirector(false)
    }

    function openshowContentData() {
        setShowContentData(true)
    }

    function closeshowContentData() {
        setShowContentData(false)
    }


    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email').required("Required"),
        password: yup.string().required("Required")

    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await CreateUserApi(data.email, data.password, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
            if (response?.status === 200) {
                showToast("User account  Successful created", "success");
                const responseAddtoorg = await AddUserOrgApi(userAtom?.user?.user?.organisation, response?.data?.user, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
                OrganisationDetail()
                closeAddUserModal()
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
            showToast("Request Failed");
            setTimeout(hideToast, 3000);
        }
    }

    const OrganisationDetail = async () => {
        try {
            if (userAtom?.user?.user?.organisation) {
                const response = await GetOrganisationDetailsApi(userAtom?.user?.user?.organisation, userAtom?.user?.auth_token);
                const responseContent = await GetContentApi(userAtom?.user?.user?.organisation, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
                if (response?.status === 200) {
                    setContentData(responseContent?.data)
                    setOrganisationDetails(response?.data)
                }
                else if (response?.status === 400) {
                    showToast("Request Failed", "error");
                    setTimeout(hideToast, 3000);
                }
                else {
                    showToast("Request Failed");
                    setTimeout(hideToast, 3000);
                }
            }
        }
        catch (error) {
            showToast("Request Failed");
            setTimeout(hideToast, 3000);
        }
    }



    useEffect(() => {
        if (!organisationDetails && userAtom?.loggedIn
        ) {
            OrganisationDetail()
        }
    }, [])

    const RemoveUser = async (id) => {
        try {
            const response = await RemoveUserFromOrgApi(userAtom?.user?.user?.organisation, id, userAtom?.user?.user?._id, userAtom?.user?.auth_token);
            if (response?.status === 200) {
                showToast("User Removed", "success");
                OrganisationDetail()
            }
            else if (response?.status === 400) {
                showToast("Request Failed", "error");
                setTimeout(hideToast, 3000);
            }
            else {
                showToast("Request Failed");
                setTimeout(hideToast, 3000);
            }
        }
        catch (error) {
            showToast("Request Failed");
            setTimeout(hideToast, 3000);
        }
    }


    return (
        <div className='h-[100vh] w-full  overflow-hidden'>
            <div className='h-[8vh] flex justify-center'>
                <div className='w-full flex items-center justify-between px-2'>
                    <img src={organisationDetails?.logo} className='h-[50px]' />
                    <div className='flex gap-[20px] items-center '>
                        <div className='hidden md:flex gap-[10px] items-center border-[2px] border-black rounded-lg p-2 hover:scale-[1.02] cursor-pointer' ><GrAddCircle size="20px" /> <span>Request to add new Directory</span>
                        </div>
                        <AiOutlineUser size="30px" className='hover:scale-[1.02] cursor-pointer' onClick={() => openUserProfile()} />
                        <BiLogOut size="30px" className='hover:scale-[1.02] cursor-pointer' onClick={() => {

                            window.location.reload()
                        }} />
                    </div>

                </div>
            </div>
            {
                userAtom?.user?.user?.isSuperAdmin ?
                    <>
                        <AddOrganisation />
                    </> : <>
                        <div className='h-[92vh]'>
                            {
                                userAtom?.user?.user?.isAdmin &&
                                <div className='w-full justify-around flex items-center '>
                                    <button onClick={openAddDirectory} className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                                        <div className='flex gap-[10px] items-center'>
                                            <AiOutlineFolderAdd size="30px" />  Add New Directory
                                        </div>
                                    </button>
                                    <button onClick={openTeamDetailsModal} className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                                        <div className='flex gap-[10px] items-center'>
                                            <AiOutlineTeam size="30px" />  Team
                                        </div>
                                    </button>
                                    <button onClick={openAddUserModal} className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                                        <div className='flex gap-[10px] items-center'>
                                            <AiOutlineUserAdd size="30px" />  Add New User
                                        </div>
                                    </button>
                                </div>
                            }

                            <div className='w-full h-full p-2 mt-[80px]'>
                                <div className='text-[30px] text-red font-inter '>Encrypted Data</div>
                                <div className='w-full flex gap-[60px] flex-wrap mt-[40px]'>

                                    {
                                        contentData && contentData?.map((item, index) => {
                                            return (
                                                <div onClick={() => { openshowContentData(); setSelectedContent(item?.description) }} className='flex flex-col gap-2 justify-center items-center justify-items-center' >
                                                    <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                                                    <div className='text-purple text-[14px]'>{item?.name}</div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <AddContent />




                        </div></>
            }



            <Transition appear show={isOpenAddUserModal} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeAddUserModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform rounded-[4px]   bg-white text-left align-middle shadow-xl transition-all w-fit   flex flex-col justify-between items-center overflow-auto  ">
                                    <div
                                        className='w-full py-[40px] px-[65px] flex flex-col justify-center items-center gap-[28px]'>
                                        <div className='w-full flex justify-end cursor-pointer'
                                            onClick={closeAddUserModal}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.13502 13.8638C1.17814 13.907 1.22935 13.9412 1.28571 13.9646C1.34208 13.988 1.4025 14 1.46351 14C1.52453 14 1.58495 13.988 1.64131 13.9646C1.69768 13.9412 1.74889 13.907 1.79201 13.8638L7.49831 8.15804L13.2069 13.8638C13.2941 13.951 13.4122 13.9999 13.5354 13.9999C13.6586 13.9999 13.7768 13.951 13.8639 13.8638C13.9511 13.7767 14 13.6586 14 13.5354C14 13.4122 13.9511 13.294 13.8639 13.2069L8.15531 7.50111L13.8616 1.79299C13.9487 1.70587 13.9977 1.58772 13.9977 1.46452C13.9977 1.34132 13.9487 1.22317 13.8616 1.13606C13.7745 1.04894 13.6563 1 13.5331 1C13.4099 1 13.2917 1.04894 13.2046 1.13606L7.49831 6.84417L1.78969 1.13838C1.70086 1.06232 1.58661 1.02257 1.46976 1.02709C1.3529 1.0316 1.24205 1.08004 1.15936 1.16272C1.07667 1.2454 1.02823 1.35624 1.02372 1.47309C1.0192 1.58993 1.05895 1.70417 1.13502 1.79299L6.84132 7.50111L1.13502 13.2092C1.04854 13.2962 1 13.4139 1 13.5365C1 13.6592 1.04854 13.7769 1.13502 13.8638Z"
                                                    fill="#262626" stroke="#262626" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add User to Organisation
                                        </Dialog.Title>
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
                                            <button type='submit' form='email-form' className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                                                Add User
                                            </button>
                                        </form>

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>




            <Transition appear show={isOpenTeamDetailsModal} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeTeamDetailsModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform rounded-[4px]   bg-white text-left align-middle shadow-xl transition-all w-fit   flex flex-col justify-between items-center overflow-auto  ">
                                    <div
                                        className='w-full py-[40px] px-[65px] flex flex-col justify-center items-center gap-[28px]'>
                                        <div className='w-full flex justify-end cursor-pointer'
                                            onClick={closeTeamDetailsModal}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.13502 13.8638C1.17814 13.907 1.22935 13.9412 1.28571 13.9646C1.34208 13.988 1.4025 14 1.46351 14C1.52453 14 1.58495 13.988 1.64131 13.9646C1.69768 13.9412 1.74889 13.907 1.79201 13.8638L7.49831 8.15804L13.2069 13.8638C13.2941 13.951 13.4122 13.9999 13.5354 13.9999C13.6586 13.9999 13.7768 13.951 13.8639 13.8638C13.9511 13.7767 14 13.6586 14 13.5354C14 13.4122 13.9511 13.294 13.8639 13.2069L8.15531 7.50111L13.8616 1.79299C13.9487 1.70587 13.9977 1.58772 13.9977 1.46452C13.9977 1.34132 13.9487 1.22317 13.8616 1.13606C13.7745 1.04894 13.6563 1 13.5331 1C13.4099 1 13.2917 1.04894 13.2046 1.13606L7.49831 6.84417L1.78969 1.13838C1.70086 1.06232 1.58661 1.02257 1.46976 1.02709C1.3529 1.0316 1.24205 1.08004 1.15936 1.16272C1.07667 1.2454 1.02823 1.35624 1.02372 1.47309C1.0192 1.58993 1.05895 1.70417 1.13502 1.79299L6.84132 7.50111L1.13502 13.2092C1.04854 13.2962 1 13.4139 1 13.5365C1 13.6592 1.04854 13.7769 1.13502 13.8638Z"
                                                    fill="#262626" stroke="#262626" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Team                                        </Dialog.Title>


                                        {
                                            organisationDetails?.members?.map((item, index) => {
                                                return (
                                                    <div className='border-1 border-black rounded-md flex'>
                                                        {item?.email}


                                                        {!item?.isAdmin && <span className='px-2'><AiOutlineDelete size="30px" onClick={() => { RemoveUser(item._id) }} /></span>}
                                                        {item?.isAdmin && <span className='px-2 text-red'>Admin</span>}

                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isOpenAddDirectory} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeAddDirectory}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform rounded-[4px]   bg-white text-left align-middle shadow-xl transition-all w-fit   flex flex-col justify-between items-center overflow-auto  ">
                                    <div
                                        className='w-full py-[40px] px-[65px] flex flex-col justify-center items-center gap-[28px]'>
                                        <div className='w-full flex justify-end cursor-pointer'
                                            onClick={closeAddDirectory}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.13502 13.8638C1.17814 13.907 1.22935 13.9412 1.28571 13.9646C1.34208 13.988 1.4025 14 1.46351 14C1.52453 14 1.58495 13.988 1.64131 13.9646C1.69768 13.9412 1.74889 13.907 1.79201 13.8638L7.49831 8.15804L13.2069 13.8638C13.2941 13.951 13.4122 13.9999 13.5354 13.9999C13.6586 13.9999 13.7768 13.951 13.8639 13.8638C13.9511 13.7767 14 13.6586 14 13.5354C14 13.4122 13.9511 13.294 13.8639 13.2069L8.15531 7.50111L13.8616 1.79299C13.9487 1.70587 13.9977 1.58772 13.9977 1.46452C13.9977 1.34132 13.9487 1.22317 13.8616 1.13606C13.7745 1.04894 13.6563 1 13.5331 1C13.4099 1 13.2917 1.04894 13.2046 1.13606L7.49831 6.84417L1.78969 1.13838C1.70086 1.06232 1.58661 1.02257 1.46976 1.02709C1.3529 1.0316 1.24205 1.08004 1.15936 1.16272C1.07667 1.2454 1.02823 1.35624 1.02372 1.47309C1.0192 1.58993 1.05895 1.70417 1.13502 1.79299L6.84132 7.50111L1.13502 13.2092C1.04854 13.2962 1 13.4139 1 13.5365C1 13.6592 1.04854 13.7769 1.13502 13.8638Z"
                                                    fill="#262626" stroke="#262626" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add Directory

                                        </Dialog.Title>

                                        <AddContent organisationDetail={organisationDetails} content={contentData} setContentData={setContentData} setIsOpenAddDirector={setIsOpenAddDirector} />


                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={showContentData} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeshowContentData}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform rounded-[4px]   bg-white text-left align-middle shadow-xl transition-all w-fit   flex flex-col justify-between items-center overflow-auto  ">
                                    <div
                                        className='w-full py-[40px] px-[65px] flex flex-col justify-center items-center gap-[28px]'>
                                        <div className='w-full flex justify-end cursor-pointer'
                                            onClick={closeshowContentData}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.13502 13.8638C1.17814 13.907 1.22935 13.9412 1.28571 13.9646C1.34208 13.988 1.4025 14 1.46351 14C1.52453 14 1.58495 13.988 1.64131 13.9646C1.69768 13.9412 1.74889 13.907 1.79201 13.8638L7.49831 8.15804L13.2069 13.8638C13.2941 13.951 13.4122 13.9999 13.5354 13.9999C13.6586 13.9999 13.7768 13.951 13.8639 13.8638C13.9511 13.7767 14 13.6586 14 13.5354C14 13.4122 13.9511 13.294 13.8639 13.2069L8.15531 7.50111L13.8616 1.79299C13.9487 1.70587 13.9977 1.58772 13.9977 1.46452C13.9977 1.34132 13.9487 1.22317 13.8616 1.13606C13.7745 1.04894 13.6563 1 13.5331 1C13.4099 1 13.2917 1.04894 13.2046 1.13606L7.49831 6.84417L1.78969 1.13838C1.70086 1.06232 1.58661 1.02257 1.46976 1.02709C1.3529 1.0316 1.24205 1.08004 1.15936 1.16272C1.07667 1.2454 1.02823 1.35624 1.02372 1.47309C1.0192 1.58993 1.05895 1.70417 1.13502 1.79299L6.84132 7.50111L1.13502 13.2092C1.04854 13.2962 1 13.4139 1 13.5365C1 13.6592 1.04854 13.7769 1.13502 13.8638Z"
                                                    fill="#262626" stroke="#262626" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Directory data

                                        </Dialog.Title>

                                        <div className='text-purple text-[16px]'>
                                            {selectedContent}
                                        </div>

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


            <Transition appear show={isOpenUserProfile} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeUserProfile}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">

                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" max-w-md transform rounded-[4px]   bg-white text-left align-middle shadow-xl transition-all w-fit   flex flex-col justify-between items-center overflow-auto  ">
                                    <div
                                        className='w-full py-[40px] px-[65px] flex flex-col justify-center items-center gap-[28px]'>
                                        <div className='w-full flex justify-end cursor-pointer'
                                            onClick={closeUserProfile}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.13502 13.8638C1.17814 13.907 1.22935 13.9412 1.28571 13.9646C1.34208 13.988 1.4025 14 1.46351 14C1.52453 14 1.58495 13.988 1.64131 13.9646C1.69768 13.9412 1.74889 13.907 1.79201 13.8638L7.49831 8.15804L13.2069 13.8638C13.2941 13.951 13.4122 13.9999 13.5354 13.9999C13.6586 13.9999 13.7768 13.951 13.8639 13.8638C13.9511 13.7767 14 13.6586 14 13.5354C14 13.4122 13.9511 13.294 13.8639 13.2069L8.15531 7.50111L13.8616 1.79299C13.9487 1.70587 13.9977 1.58772 13.9977 1.46452C13.9977 1.34132 13.9487 1.22317 13.8616 1.13606C13.7745 1.04894 13.6563 1 13.5331 1C13.4099 1 13.2917 1.04894 13.2046 1.13606L7.49831 6.84417L1.78969 1.13838C1.70086 1.06232 1.58661 1.02257 1.46976 1.02709C1.3529 1.0316 1.24205 1.08004 1.15936 1.16272C1.07667 1.2454 1.02823 1.35624 1.02372 1.47309C1.0192 1.58993 1.05895 1.70417 1.13502 1.79299L6.84132 7.50111L1.13502 13.2092C1.04854 13.2962 1 13.4139 1 13.5365C1 13.6592 1.04854 13.7769 1.13502 13.8638Z"
                                                    fill="#262626" stroke="#262626" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Profile

                                        </Dialog.Title>
                                        <div className='flex flex-col justify-start gap-[10px]'>
                                            <h4><span className='text-red px-4'>Email:   </span> {userAtom?.user?.user?.email}</h4>
                                            <h4><span className='text-red px-4'>Role:   </span> {userAtom?.user?.user?.isAdmin ? "Admin" : "User"}</h4>
                                            <h4><span className='text-red px-4'>Organisation ID:   </span> {userAtom?.user?.user?.organisation}</h4>
                                        </div>



                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>





            <ToastWrapper />

        </div>
    )
}

export default Home