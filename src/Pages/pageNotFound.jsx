import React from 'react'
import NavBar from '../components/NavBar'

const pageNotFound = ()=>{
    return(
      <div>
        <div className='nav-fix container'>
            <NavBar/>
        </div>
      <p>404 page not found</p>
      </div>
        );

}

export default pageNotFound