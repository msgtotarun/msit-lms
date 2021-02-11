import React from 'react'
import ProgramCatalog from './program-catalog'
import Login from '../components/Login'
import NavBar from '../components/NavBar'

const Home = ()=>{
    return(
        <div className="container">
        <div class='nav-fix'>
            <NavBar/>
        </div>
        <Login/>
      </div>
        );
}

export default Home
