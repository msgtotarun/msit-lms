import React from 'react'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import ProgramCatalog from '../components/program-catalog'

const Home = ()=>{
    return(<div className="container">
            <NavBar/>
        <Login/>
      </div>);

}

export default Home
