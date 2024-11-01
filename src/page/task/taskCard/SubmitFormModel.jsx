
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksById, updateTask } from '../../../Redux_Toolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { submitTask } from '../../../Redux_Toolkit/SubmissionSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SubmitFormModel({open,handleClose,item}) {
  const dispatch=useDispatch();
  const{task}=useSelector(store=>store);
  const location=useLocation();
  const queryprams= new URLSearchParams(location.search);
  const taskId=queryprams.get('taskId')
const [formData,setFormData]=useState(
    {
        gitHubLink:"",
       
        description:""
    
        
    }
);



const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name] : value});



}


//2024-02-29T18:30:00
const handleSubmit=(e)=>{
    e.preventDefault();
   
    
    
    dispatch(submitTask({taskId,githubLink:formData.gitHubLink}))
    handleClose();

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
         <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <TextField label="githubLink"
                    fullWidth
                    name='gitHubLink'
                    value={formData.gitHubLink}
                    onChange={handleChange}
                    />

                </Grid>

              


                <Grid item xs={12}>
                    <TextField label="description"
                    fullWidth
                    name='description'
                    multiline
                    rows={4}

                    value={formData.description}
                    onChange={handleChange}
                    />

                </Grid>

              


                   <Grid item xs={12}>
                 <Button fullWidth
                 className='customeButton'
                 sx={{padding:"0.9rem"}}
                 type='submit'

                 >
                    
                  Submission
                 </Button>

                   </Grid>

            </Grid>

         </form>
     
        </Box>
      </Modal>
    </div>
  );
}
