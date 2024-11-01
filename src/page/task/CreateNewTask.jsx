
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from 'react-redux';
import { createTask } from '../../Redux_Toolkit/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",

  boxShadow: 24,
  p: 4,
};

const tags=["Angular","React","Vue.js","Spring boot","node js","python"]

export default function CreateNewTask({handleClose,open,}) {


  const dispatch=useDispatch()

const [formData,setFormData]=useState(
    {
        title:"",
        image:"",
        description:"",
        tags:[],
        deadLine:new Date(),
    }
);
const  [SelectedTags,setSelectedTags]=useState([]);

const handleTagChange=(event,value)=>{
    setSelectedTags(value)

}
const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name] : value});



}

const handleDeadLineChange=(date)=>{
    setFormData({
        ...formData,
        deadLine:date
 } )

}

const formateDate=(input)=>{
    let {
        $y:year,
        $M:month,
        $D:day,
        $H:hours,
        $m:minutes,
        $s:seconds,
        $ms:milliseconds,

    }=input;
    const date=new Date(year,month,day,hours,minutes,seconds,milliseconds)
    const formatedDate=date.toISOString();
    return formatedDate;
}

//2024-02-29T18:30:00
const handleSubmit=(e)=>{
    // e.preventDefault();
    const {deadLine}=formData;
    formData.deadLine=formateDate(deadLine);
    formData.tags=SelectedTags;
    dispatch(createTask(formData))
    console.log("formData:",formData,"deadLine",formData.deadLine);
    handleClose()

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
                    <TextField label="title"
                    fullWidth
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    />

                </Grid>

                <Grid item xs={12}>
                    <TextField label="image"
                    fullWidth
                    name='image'
                    value={formData.image}
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
                    <Autocomplete multiple
                    id='multiple-limit-tags'
                    options={tags}
                    onChange={handleTagChange}
                    getOptionLabel={(option)=>option}
                    renderInput={(params)=> <TextField label="tags"
                        fullWidth
                      {...params}
                     
                        />}

                    />
                  

                </Grid>
                <Grid item xs={12}>
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
  
        <DateTimePicker className='w-full' label="DeadLine"
        onChange={handleDeadLineChange}
        renderInput={(prams)=><TextField {...prams}/>}
         />
      
    </LocalizationProvider>

                   </Grid>


                   <Grid item xs={12}>
                 <Button fullWidth
                 className='customeButton'
                 sx={{padding:"0.9rem"}}
                 type='submit'

                 >
                    
                    Create
                 </Button>

                   </Grid>

            </Grid>

         </form>
     
        </Box>
      </Modal>
    </div>
  );
}
