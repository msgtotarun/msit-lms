import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import LargeCard from '../Cards/LargeCard/LargeCard';
import {Link,withRouter} from "react-router-dom";
import './Repos.css';

var showList = [];
var layoutStyle = null;
var client = null
var response_status = 0
const {REACT_APP_APIBASE_URL}=process.env
class Repos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      loading: true
    };
  }

  componentWillMount() {
    var userID = localStorage.getItem('id');
    this.getClient(userID);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.setLayout();
  //   return true;
  // }

  getClient(userID) {
    userID = localStorage.getItem('id')
    console.log("link to check if token exists");
    console.log(process.env.REACT_APP_API_URL2+"/clientcheck/"+userID);
    fetch(process.env.REACT_APP_API_URL2+"clientcheck/"+userID)
    .then(response => response.text())
    .then(result =>{
      console.log("user github token check =");
      result = JSON.parse(result);
      console.log('befor getting client');
      console.log(result);
      console.log('after getting client');
      client = result['client']
      console.log(result)})
    .catch(error => console.log('error', error));


if(client !== ""){

  var requestOptions = {
    method: 'GET',
    headers: {"Authorization": "Bearer "+client},
    redirect: 'follow'
  };

fetch("https://api.github.com/user/repos", requestOptions)
  .then(response => {return response.text()})
  .then(result => {
    result = JSON.parse(result);
    response_status = result['message']
    console.log('repos fetched');
    console.log(result);
    console.log('check if message exists');
    console.log(result['message']);
    if(result['message'] == undefined){
      this.repolistmapper(result);
      this.setState({list: result, loading:false});
    }
    else{
      console.log('Bad credentials recived in github api');
      showList = null;
      this.setState({loading: false})
    }
      })
  .catch(error => console.log('error', error));
}else{
  console.log('Bad credentials recived in github api');
  showList = null;
  this.setState({loading: false})
}
  }

  updateToken(){
    var token = document.getElementById('token').value;
    var user = localStorage.getItem('id');
    fetch(process.env.REACT_APP_API_URL2+"/github/"+user+"/"+token)
    .then(response => response.text())
    .then(result => console.log(result))

      this.props.history.push({
    pathname: '/profilePage'
    })

  }

  repolistmapper(result){
    result.map(repo => {
      var title = repo['name'];
      var sub = repo['full_name'];
      var rlink = repo["html_url"];
      var desc = repo["description"];
      return <repoCard key={rlink} title={title} rlink={rlink} desc={desc} sub={sub}></repoCard>
    });

    showList = result
    console.log("showlist = ");
    console.log(showList)
  }

  setRender(){
    var html = null;
    var response = ""
    if (response_status === "Bad credentials"){
      html =  (<div class="card mb-3 customcard">
    <div class="col-md-8">
      <div class="card-body">
        <div class="input-group mb-3">
        <div class="alert alert-warning" role="alert">
          Invalid personal access token re enter the correct token value
        </div>
          <input id="token" type="text" class="form-control" placeholder="Github Token" aria-label="Github Token" aria-describedby="button-addon2"></input>
          <button onClick={this.updateToken} class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          <br></br>
          <a class="link-primary" onClick={window.open('https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token',"_blank")}>Generate Token</a>
        </div>
      </div>
    </div>
</div>);
    response = "Bad credentials"
    }
    else if(showList === null)
    {
      html = (<div class="card mb-3 customcard">
    <div class="col-md-8">
      <div class="card-body">
        <div class="input-group mb-3">
          <input id="token" type="text" class="form-control" placeholder="Github Personal Access Token" aria-label="Github Personal Access Token" aria-describedby="button-addon2"></input>
          <button onClick={this.updateToken} class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          <br></br>
          <a class="link-primary" onClick={window.open('https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token',"_blank")}>Generate Token</a>
        </div>
      </div>
    </div>
</div>);
    response = "No token present for user"
    }
    else if (Array.isArray(showList) && showList.length === 0)
    {
      html = (<div class="card mb-3 customcard">
    <div class="col-md-8">
      <div class="card-body">
        <p class="fs-1 text-center">No repositories to display</p>
      </div>
    </div>
</div>);
    response = "No repositories to diplay"
  }else{
    html = (<div class="container">
    <div class="row row-cols-3">
    {showList}
    </div>
    </div>);
    response = "repositories available for user"
  }

  console.log("response = ",response);

    return html;

  }

  render() {
    console.log('response status = ',response_status);
    console.log('loading = ',this.state.loading);
    if(this.state.loading){
      return (<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>);
    }

    return this.setRender();

  }

}

function repoCard(props){
  return(<div class="col"><div class="card repocard">
<div class="card-body">
  <h5 class="card-title">{props.title}</h5>
  <h6 class="card-subtitle mb-2 text-muted">
  {props.sub}
  </h6>
  <p class="card-text">{props.desc}</p>
  <a href="#" class="card-link">{props.rlink}</a>
</div>
</div></div>);
}

export default withRouter(Repos);
