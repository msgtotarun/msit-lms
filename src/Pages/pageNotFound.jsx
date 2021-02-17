import React from 'react'
import NavBar from '../components/NavBar'
import  './style.scss'

const pageNotFound = ()=>{

    return(

      <div>
        <div className='nav container'>
            <NavBar/>
        </div>
    <h1>404</h1>
    <div className='img'>
      <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="space"/>
    </div>
      <div class="text md-col-6 align-self-center flex-center">
        <h2>UH OH! You're lost.</h2>
        <p>The page you are looking for does not exist.
          How you got here is a mystery.
        </p>
      </div>
    </div>
    );

}

export default pageNotFound