import React from 'react'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import ProgramCatalog from '../components/program-catalog'

const Home = ()=>{
    return(
        <div className="container">
        <div className='nav-fix container'>
            <NavBar/>
        </div>

        <Login/>
        <ProgramCatalog view="program"></ProgramCatalog>
      </div>
        );

}

export default Home
