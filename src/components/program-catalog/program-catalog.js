import axios from 'axios';
import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListProgram from '../list-programs/list-programs';
import Card from '../Cards/Cards';
import LargeCard from '../Cards/LargeCard/LargeCard';

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
    try {
      console.log(process.env.REACT_APP_APIBASE_URL)
      var token = localStorage.getItem('token');
      const response = await fetch(process.env.REACT_APP_APIBASE_URL+'/program/get/enrolled_programs/'+userID+'/?token='+token);
      const json = await response.json();
      this.setState({ list:json })
    } catch (error) {
      console.log(error)
    }
  }

  getCourses(programID){

  }

  handleLayout(e){
    this.setState({layout: !this.state.layout});
  }

  getRenderList() {
    console.log('inside get render list');
    var userID = localStorage.getItem('id');
    console.log(`userID = ${userID}, props.view = ${this.props.view}`);

    if ("programs"==this.props.view){
        this.getPrograms(userID);
    }
    else{
        this.getCourses();
    }
  }

  setList(List){
    List = List.map(program => {
      return <ListProgram view={this.props.view} title={program['title']} description={program['description']} image={program['image']} button="Enter"></ListProgram>
    });

    return List;
  }

  setCard(List){
      List = List.map((program) =>
        <Cols view={this.props.view} title={program['title']} description={program['description']} image={program['image']} button="Enter"></Cols>
      )

      return List;
  }

  setLayout()
  {

    showList = this.state.layout?this.setCard(this.state.list):this.setList(this.state.list)

      // if(this.state.layout)
      // {
      //    showList = this.setCard(this.state.list)
      // }
      // else{
      //   showList = this.setList(this.state.list)
      // }
  }

  render() {
      this.setLayout();
      var user = localStorage.getItem('id')

      if(user===null){
        return (<div class="alert alert-warning" role="alert">
            You are not authorized to acces this page!
            </div>);
      }

      console.log(this.props.view)
      var doc = null;
      if (this.state.layout === false) {
             doc =(<div className="container">
               <NavBar userName={user}/>
               <div className="container">
               <select class="form-select" aria-label="Default select example" onChange={this.handleLayout}>
                 <option selected value="true">View: Grid</option>
                 <option value="false">View: List</option>
               </select>
    <div class="accordion" id="accordionExample">
    {showList}
    </div>
  </div></div>);
      } else {
      doc =
        (<div className="container">
          <NavBar userName={user}/>
          <div className="container">
          <select class="form-select" aria-label="Default select example" onChange={this.handleLayout}>
            <option selected value="true">View: Grid</option>
            <option value="false">View: List</option>
          </select>
                  <Rows view={this.props.view}>{showList}</Rows>
                </div>
              </div>);
      }
        return doc;
  }

}

function Rows(props){

  if(props.view == 'program')
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

  if(props.view !== 'program'){
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
