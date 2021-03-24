import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import LargeCard from '../Cards/LargeCard/LargeCard';
import {Link,withRouter} from "react-router-dom";
import './repos.css';

var showList = [];
var layoutStyle = null;
var client = null
var response_status = 0
const {REACT_APP_APIBASE_URL}=process.env
class repos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: null
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
    fetch(process.env.REACT_APP_API_URL2+"/github/"+userID)
    .then(response => response.text())
    .then(result =>{
      result = JSON.parse(result);
      client = result['client']
      console.log(result)})
    .catch(error => console.log('error', error));

    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+client);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

if(client !== ""){
fetch("https://api.github.com/user/repos", requestOptions)
  .then(response => {
    response_status = response.status
    return response.text()})
  .then(result => {
    result = JSON.parse(result);
    result.map(repo => {
      var title = repo['name'];
      var sub = repo['full_name'];
      var rlink = repo["html_url"];
      var desc = repo["description"];
      return <repoCard key={rlink} title={title} rlink={rlink} desc={desc} sub={sub}></repoCard>
    })
    showList = result
    console.log(result)})
  .catch(error => console.log('error', error));
}else{
  showList = null;
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

  render() {
    if (response_status === 401){
      return (<div class="card mb-3" style="max-width: 540px;">
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
    }
    else if(showList === null)
    {
      return (<div class="card mb-3" style="max-width: 540px;">
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
    }
    else if (Array.isArray(showList) && showList.length === 0)
    {
      return (<div class="card mb-3" style="max-width: 540px;">
    <div class="col-md-8">
      <div class="card-body">
        <p class="fs-1 text-center">No repositories to display</p>
      </div>
    </div>
</div>);
    }

    return (<div class="container">
  <div class="row row-cols-3">
  {showList}
  </div>
  </div>);

  }

}

function repoCard(props){
  return(<div class="col"><div class="card" style="width: 18rem;">
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

export default withRouter(repos);
