import React, {Component} from 'react';
import {Link,withRouter} from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import './credits.css';



class Credits extends Component{
    constructor(){
        super();
        this.state = {
            names : {
                value1: "Kalluru Rohit",
                value2: "Mallika Bhargavi",
                value3: "Radhika Patnala",
                value4: "Tarun Kumar",
                value5: "Muvvala Sravan Kumar"
            }
        }

    }
   
    render()
    {
    

        return(
            <div>
                <div>
                    <h3 class="flow1">Developers</h3>
                </div>
                <div class="card flow">
                    <div class="card-body">
                        <h5 class="card-title">{this.state.names}</h5>
                    </div>
                    <img src={this.props.image} class="card-img-top"  />
                    <div class="card-body">
                        <a href={this.props.link} class="card-link">
                            <img class="logo1" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
                        </a>
                        <a href={this.props.link1} class="card-link">
                            <img class="logo2" src="https://www.pngfind.com/pngs/m/57-571935_linkedin-icon-vector-png-linkedin-circle-logo-transparent.png" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Credits);