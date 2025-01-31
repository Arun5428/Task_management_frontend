import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserList } from '../../Redux_Toolkit/AuthSlice';
import { Store } from '@mui/icons-material';
import { assignedTaskToUser } from '../../Redux_Toolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 2,
};

const tasks=[1,1,1,1,1]

export default function UserList({handleClose,open,}) {
   



  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)

  const location=useLocation();
  const queryprams= new URLSearchParams(location.search);
  const taskId=queryprams.get('taskId')
  
  useEffect((item)=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
    
    
    

  },[])
 
  const handleassignedTaskToUser=(user)=>{
    console.log("userid",user.id);

    
    dispatch(assignedTaskToUser({userId:user.id,taskId:taskId}));
    
    
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {
          auth.users.map((item,index)=>
            <>
             <div className='flex items-center justify-between w-full'>
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src=''/>
                </ListItemAvatar>
                <ListItemText
                    secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`} 
                primary={item.fullName}
            

                />
              </ListItem>
            </div>
            <div>
              <Button onClick={()=>handleassignedTaskToUser(item)} className='customeButton'>
                select
              </Button>
            </div>
           

         

          </div>
         {index!==tasks.length-1 && <Divider variant='inset'/>}
          </>
          )

            
         
         }
        </Box>
      </Modal>
    </div>
  );
}
