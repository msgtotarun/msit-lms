import React from 'react'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
const Home = ()=>{
    const msg='Hi! '
    return(
        <div>
        <NavBar userName={msg+"Tarun"}></NavBar>
        <Login></Login>
        </div>
        );
}

export default Home