import React, { Component } from "react";
import NavBar from '../NavBar'
import './Login.css'
class Login extends Component {
  render() {
    const userName='user';

    return (
      <div>
         <NavBar userName={userName}></NavBar>
         <div class = "container h-100" >
            <div class = "d-flex justify-content-center h-100" >
            <div class = "user_card" >
            <div class = "d-flex justify-content-center" >
            <div class = "brand_logo_container" >
            <img src = "/image.jpg"
            width = "400"
            height = "400"
            class = "brand_logo"
            alt = ""/>
            </div>
            </div> 
            <div class = "d-flex justify-content-center form_container" >
            <form>
            <
            div class = "input-group mb-3" >
            <
            div class = "input-group-append" >
            <
            span class = "input-group-text" > < i class = "fas fa-user" > </i></span >
            </div>
            <input type = "text"
            name = ""
            class = "form-control input_user"
            value = ""
            placeholder = "username" />
            </div> 
            <div class = "input-group mb-2" >
            < div class = "input-group-append" >
            <span class = "input-group-text" > < i class = "fas fa-key" > </i> </span>
            </div> 
            <input type = "password"
            name = ""
            class = "form-control input_pass"
            value = ""
            placeholder = "password" />
            </div> 
            <div class = "mt-4" >
            <div class = "d-flex justify-content-center links" >
            <a href = "#" > Forgot your password ? </a> 
            </div> 
            </div> 
            <div class = "d-flex justify-content-center mt-3 login_container" >
            <button type = "button"
            name = "button"
            class = "btn login_btn" > Login </button> 
            </div> 
            </form> 
            </div>
            </div> 
            </div> 
            </div>

      </div>
    );
}
}
export default Login;
