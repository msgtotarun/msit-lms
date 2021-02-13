import axios from 'axios';
import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import Card from '../Cards/Cards';
import LargeCard from '../Cards/LargeCard/LargeCard';
import './program-catalog.css';

var showList = [];

class ProgramCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: []
    };
  }

  componentDidMount() {
    console.log('inside cdm')
    this.getRenderList();
  }

  async getPrograms(userID) {
    // example code
   console.log(process.env.REACT_APP_APIBASE_URL)
   var token = localStorage.getItem('token');
   await fetch(process.env.REACT_APP_APIBASE_URL+'/api/program/get/enrolled_programs/'+userID+'/?token='+token)
  .then(response => response.text())
  .then(result => {
    var json = JSON.parse(result);
    // json = json[0]['enrollments'];
    // console.log(json);
    this.setState({ list:json[0]['enrollments']},()=>{
      console.log('list state updated');
      console.log(this.state.list);
    });
  }).catch(error => console.log('error', error));


  }

  getCourses(programID){

  }

  handleLayout(value){
    if (this.state.layout !== value)
    {
      this.setState({layout: !this.state.layout});
    }

    return;
  }

  getRenderList() {
    console.log('inside get render list');
    var userID = localStorage.getItem('id');
    var view = this.props.location.state.view;
    console.log(`userID = ${userID}, props.view = ${view}`);
    console.log(view=='programs');
    if ("programs"==view){
        this.getPrograms(userID);
    }
    else{
        this.getCourses();
    }
  }

  setList(List){
    List = List.map(program => {
      return <ListPrograms key={program['programID']['_id']} view={this.props.location.state.view} title={program['programID']['programName']} description={program['programID']['programDescription']} image={program['programID']['programImage']} button="Enter"></ListPrograms>
    });

    return List;
  }

  setCard(List){
    console.log('inside set card');
      List = List.map((program) =>
        <Cols key={program['programID']['_id']} view={this.props.location.state.view} title={program['programID']['programName']} description={program['programID']['programDescription']} image={program['programID']['programImage']} button="Enter"></Cols>
      )
      return List;
  }

  setLayout()
  {
    console.log('inside set layout');
    console.log(this.state.list);
    showList = this.state.layout?this.setCard(this.state.list):this.setList(this.state.list)
    console.log("showlist");
    console.log(showList);
      // if(this.state.layout)
      // {
      //    showList = this.setCard(this.state.list)
      // }
      // else{
      //   showList = this.setList(this.state.list)
      // }
  }

  render() {
      var user = this.props.location.state.email;

      this.setLayout();

      if(user===null){
        return (<div class="alert alert-warning" role="alert">
            You are not authorized to acces this page!
            </div>);
      }

      console.log(this.props.location.state.view)
      var doc = null;
      if (this.state.layout === false) {
             doc =(<div className="container">
               <NavBar userName={user}/>
               <div className="container">
                 <div class="btn-group w-25 p-3 marged">
    <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-display"></i> View
    </button>
    <ul class="dropdown-menu">
      <li onClick={()=>{this.handleLayout(true)}}><i class="bi bi-grid-3x3-gap" ></i> Grid</li>
      <li onClick={()=>{this.handleLayout(false)}}><i class="bi bi-list-task"></i> List</li>
    </ul>
  </div>
    <div class="accordion" id="accordionExample">
    {showList}
    </div>
  </div></div>);
      } else {
      doc =
        (<div className="container">
          <NavBar userName={user}/>
            <div class="btn-group w-25 p-3 marged">
  <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="bi bi-display"></i> View
  </button>
  <ul class="dropdown-menu">
  <li onClick={()=>{this.handleLayout(true)}}><i class="bi bi-grid-3x3-gap" ></i> Grid</li>
  <li onClick={()=>{this.handleLayout(false)}}><i class="bi bi-list-task"></i> List</li>
  </ul>
  </div>
      <Rows view={this.props.location.state.view}>{showList}</Rows>
  </div>);
      }
        return doc;
  }

}

function Rows(props){

  if(props.view == 'programs')
  {
    return (<div className="container">
            <div className="row row-cols-3">
            {props.children}
            </div>
          </div>);
  }

  return (<div className="container">{props.children}</div>);

}

function Cols(props){
  console.log(props);
  if(props.view !== 'programs'){
    return (<div className="row">

    <LargeCard title={props.title} description={props.description} button={props.button} image={props.image}>
    </LargeCard>
    </div>);
  }

  return (<div className="col">

      <Card title={props.title} description={props.description} button={props.button} image={props.image}></Card>
          </div>);
}

export default ProgramCatalog;
