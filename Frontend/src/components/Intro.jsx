import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import Logout from './Logout'

function Intro() {
    const [authUser, setAuthUser] = useAuth()

    return (
        <>
            <div className='max-w-screen-2xl conatainer mx-auto md:px-20 px-4'>
                <div>
                    <h1 className='font-semibold text-xl pb-2'>Accessing the Art Gallery</h1>
                    <p className='font-bold text-xl'>
                        To access the gallery you need to login
                        <br />
                        By signing up you post your work
                        {
                            authUser ? (
                                <Logout />
                            ) : (
                                <div className="">
                                    <Link to ="/login" className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">Login</Link>
                                </div>
                            )
                        }
                    </p>
                </div>
            </div>
        </>
    )
}

export default Intro