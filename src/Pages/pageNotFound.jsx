import React from 'react'
import NavBar from '../components/NavBar'

const pageNotFound = ()=>{
    return(
      // <div>
      //   <div className='nav-fix container'>
      //       <NavBar/>
      //   </div>
      // <p>404 page not found</p>
      // </div>
      <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
            </div>
        </div>
    </div>
</div>
     );
}

export default pageNotFound