import React, { Component } from "react";
import './NavBar.css'
class NavBar extends Component {
 
  render(props) {

  
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-colour navbar-dark">
      <div class="container-fluid">
      <a class="navbar-brand" href="#">
    <img src="/web_icon.jpg" width="50" height="50" alt=""/>
  </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul class="navbar-nav mr-auto mb-lg-0">
            
          </ul> */}
          
          <ul class="nav navbar-nav ml-auto">
          <li class="nav-item">
              <a class="nav-link" href='#'>Credits</a>
            </li>
            <li class="nav-item">
          <a class="nav-link " href="#">Course status</a>
        </li>
                  <li class="nav-item">
          <span class="nav-link active">{this.props.userName}</span>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#">Logout</a>
        </li>
          </ul>
         
        </div>
      </div>
    </nav>
  );
  }
}


export default NavBar;
