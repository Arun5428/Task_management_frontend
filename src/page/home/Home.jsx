import React from 'react'
import Sidebar from '../sideBar/Sidebar'
import TaskList from '../taskList/TaskList'

const Home = () => {
  return (
    <div className='lg:flex px-5 lg:px-20 pt-[2.9vh]'> 
        
        <div className='hidden lg:block w-[25vw] relative'> <Sidebar/> </div>
        <div className='right-side-part w-full flex justify-center ml-[25vw] '>
        <TaskList/>
          

        </div>
    </div>
  )
}

export default Home