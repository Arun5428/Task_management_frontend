import { Avatar } from '@mui/material'
import React from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {task,auth}=useSelector(store =>store)
  // console.log("users",auth.users);
  
  // console.log("loginsss",auth.user.fullName);
  
  return (
    <div className='containers z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10, flex justify-between items-center'>
        <p className='font-bold text-lg'>Arun Task manager</p>
        <div className='flex items-center gap-5'>
            <p>{auth.user?.fullName}</p>
            <Avatar sx={{backgroundColor:"#c24dd0"}} className='bg-[#c24dd0] '>c</Avatar>
        </div>
    </div>
    
  )
}

export default Navbar