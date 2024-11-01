import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../Redux_Toolkit/AuthSlice';

const Signup = ({togglePannel}) => {
  const dispatch=useDispatch();
    const[formData,setFormdata]=useState({
      fullName:"",

        email:"",
        password:"",
        role:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormdata({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(register(formData))
        console.log("login form",formData);
    }
  return (
    <div className=''>
        <h1 className='text-lg font-bold text-center pb-8'>Register</h1>

        <form  className='space-y-3' action=""  onSubmit={handleSubmit}>
        <TextField
            fullWidth
            label="fullName"
            name='fullName'
            type='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='enter your fullName'

            />
            <TextField
            fullWidth
            label="email"
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='enter your email'

            />
              <TextField
            fullWidth
            label="password"
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='enter your password'
            
            />
                 <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.role}
          label="role"
          name='role'
          onChange={handleChange}
        >
          <MenuItem value={'ROLE_CUSTOMER'}>USER</MenuItem>
          <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
       
        </Select>
      </FormControl>

            

<div>
                 <Button fullWidth
                 className='customeButton'
                 sx={{padding:"0.9rem"}}
                 type='submit'

                 >
                    
                    Login
                 </Button>

                 </div>

        </form>
        <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
            <span>Alreadt have an account ?</span>
            <Button onClick={togglePannel}> Signin</Button>
        </div>
        
    </div>
  )
}

export default Signup