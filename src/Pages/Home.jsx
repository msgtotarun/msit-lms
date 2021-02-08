import React from 'react'
import ProgramCatalog from './program-catalog/program-catalog'
import Login from '../components/Login'

const Home = ()=>{
    return(
      <div class="container">
        <div class='nav-fix'>
        <Login></Login>
        </div>
        <ProgramCatalog view="program"></ProgramCatalog>
      </div>
        );
}

export default Home
