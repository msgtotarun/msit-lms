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
                    <div className="col-4 style1">
                        <div className="m-b-25">
                            <img className="img-radius" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                        </div>
                        <h6 className="f-w-600 fonts">{name}</h6>
                    </div>
                    <div className="col-8 style2">
                        <div className="card-block">
                            <h6 className="m-b-20 p-b-5 f-w-600 text-style text-style1 fonts">Information</h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">First Name</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{firstName}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Last Name</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{lastName}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Email</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{email}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Phone</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{mobile}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Date of Birth</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{dateOfBirth}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Gender</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{gender}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600 text-start fonts">Role</p>
                                    <h6 className="text-muted f-w-400 text-start fonts">{role}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h6 className="m-b-20 p-b-5 f-w-600 text-style text-style2 fonts">GitHub Repositories</h6>
                    <div className="row">

                    </div>
                </div>
            </div>


        );
    }
}

export default withRouter(Profile);