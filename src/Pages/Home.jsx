import React from 'react'
import ProgramCatalog from './program-catalog'
import Login from '../components/Login'
import NavBar from '../components/NavBar'

const Home = ()=>{
    return(
      <div className="container">
        <div className='nav-fix'>
        <NavBar userName=''></NavBar>
        </div>
        <ProgramCatalog view="program"></ProgramCatalog>
      </div>
        );
}

export default Home
