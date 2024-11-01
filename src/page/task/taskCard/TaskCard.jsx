import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserList from '../UserList';
import SubmissionList from './SubmissionList';
import EditTaskForm from './EditTaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../../Redux_Toolkit/TaskSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SubmitFormModel from './SubmitFormModel';

const TaskCard = ({item}) => {

    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    const{auth}=useSelector(store=>store)
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
   


    const [openUserList,setOpenUserList]=useState(false);
    const handleClostUserList=()=>{
        setOpenUserList(false);
        
    }
    const role="ROLE_ADMIN";
    const handleOpenUserList=()=>{
        const updatedPrames=new URLSearchParams(location.search);

        updatedPrames.set("taskId",item.id)
        navigate(`${location.pathname}?${updatedPrames.toString()}`)
        setOpenUserList(true);
        handleMenuClose();

    };



    const [openhandleSubmitFormModel,setOpenhandleSubmitFormModel]=useState(false);
    const handleCloseOpenSubmissionFormModel=()=>{
        setOpenhandleSubmitFormModel(false);
        
    }
    const handleOpenSubmissionFormModel=()=>{
        const updatedPrames=new URLSearchParams(location.search);

        updatedPrames.set("taskId",item.id)
        navigate(`${location.pathname}?${updatedPrames.toString()}`)
        setOpenhandleSubmitFormModel(true);
        handleMenuClose();

    }


    const [openSubmissionUserList,setOpenSubmissionUserList]=useState(false);
    const handleCloseOpenSubmissionList=()=>{
        setOpenSubmissionUserList(false);
        
    }
    const handleOpenSubmissionList=()=>{
        const updatedPrames=new URLSearchParams(location.search);

        updatedPrames.set("taskId",item.id)
        navigate(`${location.pathname}?${updatedPrames.toString()}`)
        setOpenSubmissionUserList(true);
        handleMenuClose();

    }

    

    const [openUpdateTaskForm,setOpenUpdateTaskForm]=useState(false);
    const handleCloseUpdateTaskForm=()=>{
        setOpenUpdateTaskForm(false);
        
    }
 const handleRemoveTaskIdParamss=()=>{
    const updatedPrames=new URLSearchParams(location.search);
    updatedPrames.delete("taskId")
    const queryString=updatedPrames.toString();
    const updatedPath=queryString? `${location.pathname}?${queryString}`:location.pathname;
    navigate(updatedPath)
 }


    const handleUpdateTaskModel=()=>{
        const updatedPrames=new URLSearchParams(location.search);

            updatedPrames.set("taskId",item.id)
            navigate(`${location.pathname}?${updatedPrames.toString()}`)
            setOpenUpdateTaskForm(true);
            handleMenuClose();
        
    }
    const handleDeleteTask=()=>{
        dispatch(deleteTask(item.id))
        handleMenuClose();

    }

  return (
    <div>
    <div className='card lg:flex justify-between '> 
    <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
        <div className=''>
            <img className='lg:w-[7rem] lg:h-[7rem] object-cover' src={item.image}/>
        </div>
        <div className='space-y-5'>
            <div className='space-y-2'>
                <h1 className='font-bold text-lg'>{item.title}</h1>
                <p className='text-gray-500 text-sm'>{item.description}</p>
            </div>
            <div className='flex flex-wrap gap-2 items-center'>
                {item.tags.map((item)=><span className='py-1 px-3 rounded-full techStach'>
                    {item}
                </span>)}
            </div>
        </div>

       
    </div>
    <div> <IconButton   id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleMenuClick}>
            <MoreVertIcon/>
            </IconButton>

            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        {
            auth.user?.role==="ROLE_ADMIN"? (<>
                <MenuItem onClick={handleOpenUserList}>ASSIGN USER</MenuItem>
           <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
           <MenuItem onClick={handleUpdateTaskModel}>Edit</MenuItem>
           <MenuItem onClick={handleDeleteTask}>delete</MenuItem>
          
               </>):(<>

<MenuItem onClick={handleOpenSubmissionFormModel}>submit</MenuItem>
</>)
        }
      </Menu>
            </div>
    </div>
    <UserList open={openUserList} handleClose={handleClostUserList}/>
    <SubmissionList open={openSubmissionUserList} handleClose={handleCloseOpenSubmissionList}/>
    <EditTaskForm item={item} open={openUpdateTaskForm} handleClose={handleCloseUpdateTaskForm}/>
    <SubmitFormModel open={openhandleSubmitFormModel} handleClose={handleCloseOpenSubmissionFormModel} />
    </div>
  )
}

export default TaskCard;