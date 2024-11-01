import React, { useEffect } from 'react'
import TaskCard from '../task/taskCard/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchUsersTasks } from '../../Redux_Toolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const TaskList = () => {
  const dispatch=useDispatch();
  const {task,auth}=useSelector(store=>store)
  const location=useLocation();
  const queryprams= new URLSearchParams(location.search);
  const filterValue=queryprams.get('filter')

  useEffect(()=>{
    if(auth.user?.role=="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}))
    }else{

      dispatch(fetchUsersTasks({status:filterValue}))
    }
   
  },[filterValue]);

  // console.log("tasks",task);
  
  return (
    <div className='w-[65vw] px-5'>
        <div className='space-y-3 '>

        { auth.user?.role=="ROLE_ADMIN"?
          task.tasks.map((item)=> (<TaskCard item={item}/>))
          :
          task.usersTask.map((item)=> (<TaskCard item={item}/>))

        }

        </div>
       

    </div>
  )
}

export default TaskList