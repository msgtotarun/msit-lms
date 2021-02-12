import React from 'react'
import NavBar from '../components/NavBar'
import Login from '../components/Login'

const Home = ()=>{
    return(
      <div>
        <div className='nav-fix container'>
            <NavBar/>
        </div>
        <Login/>
      </div>
        );

}

export default Home

