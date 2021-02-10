import React, { Component } from "react";
import './Login.css'
class  Login extends Component {
  constructor(props){
    super(props)
    this.state ={
      username:'',
      password:''
    }
  }
  handleInputChange=(event)=>{
   this.setState({
     [event.target.name]:event.target.value
  })
}
  
  handleLogin(event){
    var user=document.querySelector(".input_user").value;
    var Pass=document.querySelector(".input_pass").value;

    
  }
  render() {
    var userName=this.props.userName;
    console.log('username: ',userName)
    if(userName===undefined || userName===null)
var login=

            <div className  = "d-flex justify-content-center h-100" >
            <div className  = "user_card" >
            <div className  = "d-flex justify-content-center" >
            <div className  = "brand_logo_container" >
            <img src = "/image.jpg"
            width = "400"
            height = "400"
            className  = "brand_logo"
            alt = ""/>
            </div>
            </div> 
            <div className  = "d-flex justify-content-center form_container" >
            <form>
            <
            div className  = "input-group mb-3" >
            <
            div className  = "input-group-append" >
            <
            span className  = "input-group-text" > < i className  = "fas fa-user" > </i></span >
            </div>
            <input type = "text"
            name = "username"
            className  = "form-control input_user"
            value = {this.state.username}
            placeholder = "username"
            onChange={this.handleInputChange}
            />
            
            </div> 
            <div className  = "input-group mb-2" >
            < div className  = "input-group-append" >
            <span className  = "input-group-text" > < i className  = "fas fa-key" > </i> </span>
            </div> 
            <input type = "password"
            name = "password"
            className  = "form-control input_pass"
            value = {this.state.password}
            placeholder = "password"
            onChange={this.handleInputChange}
            />

            </div> 
            <div className  = "mt-4" >
            <div className  = "d-flex justify-content-center links" >
            <a href = "#" > Forgot your password ? </a> 
            </div> 
            </div> 
            <div className  = "d-flex justify-content-center mt-3 login_container" >
            <button type = "button"
            name = "button"
            className  = "btn login_btn"  onClick={this.handleLogin}> Login </button> 
            </div> 
            </form> 
            </div>
            </div> 
            </div> 
    return (
      <div className  = "container h-100 loginFix" >
      {login}
      </div>
      );
}
}
export default Login;
