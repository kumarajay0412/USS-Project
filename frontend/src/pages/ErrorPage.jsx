import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <main className="w-full flex flex-col justify-center items-center  h-[100vh]">
            <h1 className="text-9xl font-extrabold text-purple tracking-widest">404</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <Link to={"/"}>
                    <div className='bg-purple rounded-lg text-lg text-white p-2 hover:scale-105 transition ease-in-out duration-150'>
                        Go Home
                    </div>
                </Link>
            </button>
        </main>
    )
}

export default ErrorPage