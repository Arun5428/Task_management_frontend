import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import './Sidebar.css'
import CreateNewTask from '../task/CreateNewTask'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux_Toolkit/AuthSlice'
import { useDispatch } from 'react-redux'
const menu=[
   { name:"Home",value:"Home", role:["ROLE_ADMIN","ROLE_CUSTOMER"]},
   {name:"DONE",value:"DONE",role:["ROLE_ADMIN"]},
   {name:"ASSIGNED",value:"ASSIGNED",role:["ROLE_ADMIN"]},
   {name:"NOT ASSIGNED",value:"PENDING",role:["ROLE_ADMIN"]},
   {name:"Create New Task",value:"",role:["ROLE_ADMIN"]},
   {name:"Notification",value:"NOTIFICATION",role:["ROLE_CUSTOMER"]}

]
const role="ROLE_ADMIN";

const Sidebar = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [activeMene,setactiveMene]=useState("Home");
    const disparch=useDispatch();

    const [openCreateTaskForm,setOpenCreateTaskForm]=useState(false);
    const handleCloseCreateTaskForm=()=>{
        setOpenCreateTaskForm(false);
        
    }
    const handleOpenCreateTaskModel=()=>{
        setOpenCreateTaskForm(true);
       

    }
 
    const handleMeneChange=(item)=>{
        const updatedPrames=new URLSearchParams(location.search);

        if(item.name==="Create New Task"){
            handleOpenCreateTaskModel();
        }

        // login?filter?sort
        //?sort 
        else if(item.name==="Home"){

            updatedPrames.delete("filter")
            const queryString=updatedPrames.toString();
            const updatedPath=queryString? `${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath)
    }

    else{
        updatedPrames.set("filter",item.value)
        navigate(`${location.pathname}?${updatedPrames.toString()}`)
    }

    
    setactiveMene(item.name)
    }
        
    const handleLogout=()=>{
        disparch(logout());
        console.log("handle logout")
    }  
  return (

    <>
      <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[25vw]'>
        <div className='space-y-4 h-full'>
            <div className='flex justify-center'>
                <Avatar sx={{width:"8rem", height:"8rem"}} 
                className='border-2 border-[#c24dd0]'
                src='https://png.pngtree.com/png-clipart/20230321/original/pngtree-letter-a-logo-design-png-image_8998584.png'/>

            </div>
            {
                menu.filter((item)=>item.role.includes(role))
                .map((item)=><p  onClick={()=>handleMeneChange(item)} className={`py-2 px-5 rounded-full text-center cursor-pointer ${activeMene===item.name?
                    "activeMenuItem":"menuItems"
                }`}>
                    {item.name}
                </p>)
            }
           <Button onClick={handleLogout} sx={{padding:"0.7rem",borderRadius:"2rem"}} fullWidth className='logoutButton'
           > logout </Button>
        </div>
    </div>
    <CreateNewTask open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm}/>
    </>
  
  )
}

export default Sidebar