import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import { BsFolder2Open } from 'react-icons/bs'
import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineFolderAdd } from 'react-icons/ai'
function Home() {

    const [user, setUser] = React.useState("user")

    return (
        <div className='h-[100vh] w-full'>
            <div className='h-[8vh] flex justify-center'>
                <div className='w-full flex items-center justify-between px-2'>
                    <img src="https://framerusercontent.com/images/HyYNu7kXqEmDEcljV3ItJYmn0.png?scale-down-to=512" className='h-[50px]' />
                    <div className='flex gap-[20px] items-center '>
                        <div className='hidden md:flex gap-[10px] items-center border-[2px] border-black rounded-lg p-2 hover:scale-[1.02] cursor-pointer' ><GrAddCircle size="20px" /> <span>Request to add new Directory</span>
                        </div>
                        <AiOutlineUser size="30px" className='hover:scale-[1.02] cursor-pointer' />
                        <BiLogOut size="30px" className='hover:scale-[1.02] cursor-pointer' />
                    </div>

                </div>
            </div>
            <div className='h-[92vh]'>
                <div className='w-full justify-around flex items-center '>
                    <button className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                        <div className='flex gap-[10px] items-center'>
                            <AiOutlineFolderAdd size="30px" />  Add New Directory
                        </div>
                    </button>
                    <button className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                        <div className='flex gap-[10px] items-center'>
                            <AiOutlineTeam size="30px" />  Team
                        </div>
                    </button>
                    <button className='w-full px-[32px] md:w-auto rounded border-purple border-[1px] mt-4 bg-purple hover:bg-white hover:text-purple text-white p-2 transition ease-in-out duration-150'>
                        <div className='flex gap-[10px] items-center'>
                            <AiOutlineUserAdd size="30px" />  Add New User
                        </div>
                    </button>
                </div>
                <div className='w-full h-full p-2'>
                    <div className='w-full flex gap-[60px] flex-wrap mt-[80px]'>
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />
                        <BsFolder2Open size="40px" className='hover:scale-[1.02] cursor-pointer' />



                    </div>
                </div>
            </div>



        </div>
    )
}

export default Home