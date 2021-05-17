import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  render() {

    var isLogined = localStorage.getItem("username") !== null;
    const userName = "Hi! " + localStorage.getItem("username");
    var home = isLogined ? "/program-catalog" : "/";
    var profile = "/Profile"
    return (
      <nav className='navbar fixed-top navbar-expand-sm navbar-colour navbar-dark '>
        <div className='container-fluid'>
          <Link className='navbar-brand' to={home}>
          <i class="bi bi-house"></i>
          </Link>
          {/* <Link className ="navbar-brand" to='/' >LMS</Link> */}
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'></span>
          </button>
          {isLogined && (
            <div className='collapse navbar-collapse' id='navbarNavDropdown'>
              <ul className='navbar-nav me-auto mb-lg-0'>
                <li className='nav-item'>
                  <Link className='nav-link active' to='/Credits'>
                  <i class="bi bi-people"></i> Credits
                  </Link>
                </li>
              </ul>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                  <Link className='nav-link active' to='/CourseStatus'>
                  <i class="bi bi-award"></i> Progress
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link active' to={profile}><i class="bi bi-person-circle"></i></Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    onClick={(e) => {
                      localStorage.clear();
                      window.location.replace("/");
                    }}>
                    <i class="bi bi-box-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
