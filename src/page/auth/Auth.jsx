import React, { useState } from 'react'
import "./Auth.css"
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
    const [isRegister,setIsResister]=useState(false);
    const togglePannel=()=>{
        setIsResister(!isRegister)
    }
      return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
        <div className='box lg:max-w-4xl'>
            <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
                <div className='front'>
                    <img src="https://wallpaperaccess.com/full/191366.jpg" alt="" />
                    <div className='text'>
                        <span className='text-1'>
                            Success is build upon well-organized tasks
                        </span>
                        <span className='text-2 text-xs'> Let's get connected</span>
                    </div>
                </div>
                <div className='back '>
                    <img src="https://c1.wallpaperflare.com/preview/108/814/559/laptop-office-desk-camera.jpg" alt="" />


                </div>

            </div>
            <div className='forms h-full '>
                <div className='form-content h-full'>
                    <div className='login-form'>
                       <Signin togglePannel={togglePannel}/>

                    </div>

                    <div className='signup-form'>
                        <Signup togglePannel={togglePannel}/>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth;