

import * as React from 'react';
import Box from '@mui/material/Box';


import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCatd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllSubmission, fetchSubmissionsByTaskId } from '../../../Redux_Toolkit/SubmissionSlice';
import { useLocation } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Submission=[1,1,1];
export default function SubmissionList({handleClose,open,}) {
 
 const dispatch=useDispatch();
 const location=useLocation();
 const queryprams= new URLSearchParams(location.search);
 const taskId=queryprams.get('taskId');
 const {submission}=useSelector(store=>store);

 useEffect(()=>{
  if(taskId){
   


  }
  dispatch(fetchSubmissionsByTaskId({taskId}))
 
  


 },[taskId])
//  console.log("submissions",submission)



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
          <div>
{submission.submissions.length>0? <div className='space-y-2'>
  {submission.submissions.map((item)=><SubmissionCard item={item} />)}
</div> :<div className='text-center'>No Submission Found</div>}
          </div>
         <div className=''>

          

         </div>
  
        </Box>
      </Modal>
    </div>
  );
}
