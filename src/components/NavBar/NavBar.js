import React, { Component } from "react";
import {Link} from "react-router-dom";
import './NavBar.css'
var userName=""
class NavBar extends Component {
 
  render() {
    userName=this.props.userName
   
    if(userName!==''){
      var userNav=  
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <ul class="navbar-nav mr-auto mb-lg-0">
                  
                </ul> */}
                
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to='#'>Credits</Link>
                    </li>
                    <li class="nav-item">
                        <Link  class="nav-link " to="#">Course status</Link>
                    </li>
                    <li class="nav-item">
                      <span class="nav-link active">{'Hi! '+userName}</span>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link " to="#">Logout</Link>
                  </li>
                </ul>
              
          </div>
      
    }
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-colour navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">LMS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        {userNav}
      </div>
    </nav>
  );
  }
}


export default NavBar;
