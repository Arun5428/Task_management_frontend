import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../Redux_Toolkit/AuthSlice';

const Signin = ({togglePannel}) => {
  const dispatch=useDispatch()
    const[formData,setFormdate]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
      const {name,value}=e.target;
        setFormdate({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(formData))

        console.log("login form",formData);
    }
  return (
    <div className=''>
        <h1 className='text-lg font-bold text-center pb-8'>login</h1>

        <form  className='space-y-3' action="" onSubmit={handleSubmit}>
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
            <span>don't have an account ?</span>
            <Button onClick={togglePannel}> Signup</Button>
        </div>
        
    </div>
  )
}

export default Signin