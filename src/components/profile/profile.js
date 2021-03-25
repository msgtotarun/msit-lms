import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    getUser() {
        var urlencoded = new URLSearchParams();
        urlencoded.append("token", localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            redirect: 'follow'
        };
        fetch(process.env.REACT_APP_APIBASE_URL + "/api/user/details/?id=" + localStorage.getItem('id') + "&token=" + localStorage.getItem('token'), requestOptions)
            .then(response => response.text())
            .then(result => {
                var json = JSON.parse(result);
                // json = json[0]['enrollments'];
                console.log('user data');
                console.log(json);
                this.setState({ user: json }, () => {
                    console.log('user state updated');
                    console.log(this.state.user);
                });
            }).catch(error => console.log('error', error));
    }
    componentDidMount() {
        this.getUser();

    }
    render() {
        var name = 'Null';
        var firstName = 'Null';
        var lastName = 'Null';
        var email = 'Null';
        var mobile = '0000000000';
        var dateOfBirth = '01 - 01 - 1900';
        var gender = 'Null';
        var role = 'Null';
        if (this.state.user != null) {
            name = this.state.user['firstName'] + ' ' + this.state.user['lastName'];
            firstName = this.state.user['firstName'];
            lastName = this.state.user['lastName'];
            email = this.state.user['email'];
            mobile = this.state.user['phoneNo'];
            dateOfBirth = this.state.user['dateOfBirth'];
            gender = this.state.user['gender'];
            role = this.state.user['role'];
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="m-b-25">
                            <img className="img-radius" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                        </div>
                        <h6 className="f-w-600">{name}</h6>
                    </div>
                    <div className="col-8">
                        <div className="card-block">
                            <h6 className="m-b-20 p-b-5 f-w-600 text-style text-style1">Information</h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">First Name</p>
                                    <h6 className="text-muted f-w-400 text-start">{firstName}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Last Name</p>
                                    <h6 className="text-muted f-w-400 text-start">{lastName}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Email</p>
                                    <h6 className="text-muted f-w-400 text-start">{email}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Phone</p>
                                    <h6 className="text-muted f-w-400 text-start">{mobile}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Date of Birth</p>
                                    <h6 className="text-muted f-w-400 text-start">{dateOfBirth}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Gender</p>
                                    <h6 className="text-muted f-w-400 text-start">{gender}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start">Role</p>
                                    <h6 className="text-muted f-w-400 text-start">{role}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h6 className="m-b-20 p-b-5 f-w-600 text-style text-style2">GitHub Repositories</h6>
                    <div className="row">

                    </div>
                </div>
            </div>


        );
    }
}

export default withRouter(Profile);