import React from 'react'
import NavBar from '../components/NavBar'
import Login from '../components/Login'

const Home = ()=>{
    return(
        <div className='nav-fix container'>
            <NavBar/>
            <Login/>
        </div>
      );
}

export default Home
