
import { ThemeProvider } from '@emotion/react';
import { DarkTheme } from './theam/DarkTheme';
import Navbar from './page/Navbar/Navbar';

import Home from './page/home/Home';
import Auth from './page/auth/Auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './Redux_Toolkit/TaskSlice';
import { getUserProfile } from './Redux_Toolkit/AuthSlice';


function App() {


  // const user=true

  const dispatch=useDispatch();
  const {task,auth}=useSelector(store =>store)

  useEffect(()=>{
    dispatch(fetchTasks({}))
    dispatch(getUserProfile(auth.jwt || localStorage.getItem('jwt')));
    console.log("users:",auth.user);
    
   
  },[auth.jwt]);

 
  
  return (
    <ThemeProvider theme={DarkTheme}>
    { auth.user?  <div>
      <Navbar/>
      <Home/>

      </div>:   <Auth/> }






    
   
  

    </ThemeProvider>

  );
}

export default App;
