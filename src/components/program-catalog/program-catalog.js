import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import Card from '../Cards/Cards';
import LargeCard from '../Cards/LargeCard/LargeCard';
import {Link,withRouter} from "react-router-dom";
import './program-catalog.css';

var showList = [];
var view = null;
var layoutStyle = null;

class ProgramCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: []
    };
  }

  componentWillMount() {
    console.log('inside cdm')
    layoutStyle = this.props.location.state.layout;
    this.getRenderList();
    // this.setLayout();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.setLayout();
  //   return true;
  // }

  async getPrograms(userID) {
    // example code

   console.log(process.env.REACT_APP_APIBASE_URL)
   var token = localStorage.getItem('token');
   await fetch(process.env.REACT_APP_APIBASE_URL+'/api/program/get/enrolled_programs/'+userID+'/?token='+token)
  .then(response => response.text())
  .then(result => {
    var json = JSON.parse(result);
    // json = json[0]['enrollments'];
    console.log('get programs api fetched');
    console.log(json[0]['enrollments']);
    this.setState({ list:json[0]['enrollments'],layout:layoutStyle});
  }).catch(error => console.log('error', error));


  }

  async getCourses(programID){
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('id');
    await fetch(process.env.REACT_APP_APIBASE_URL+'/api/course/get/courseinfo/' + userID + '/' + programID + '/?token=' + token)
   .then(response => response.text())
   .then(result => {
     var json = JSON.parse(result);
     // json = json[0]['enrollments'];
     console.log('course data');
     console.log(json);
     this.setState({ list:json['courses'],layout:layoutStyle},()=>{
       console.log('list state updated');
       console.log(this.state.list);
     });
   }).catch(error => console.log('error', error));

  }

  handleLayout(value){
    if (this.state.layout !== value)
    {
      this.setState({layout: !this.state.layout});
    }
  }

  getRenderList() {
    console.log('inside get render list');
    var userID = localStorage.getItem('id');
    view = this.props.location.state.view;
    console.log(`userID = ${userID}, props.view = ${view}`);
    console.log(view==='programs');
    if ("programs"===view){
        this.getPrograms(userID);
    }
    else{
      var id = this.props.location.state.id;
        this.getCourses(id);
    }
  }

  setList(List){
    console.log('inside set list function');
    // view = this.props.location.state.view;
    console.log(`view = ${view}`);
    List = List.map(program => {
      var [ID,Title,Desc,Img] = this.getData(program);
      console.log(`List ID = ${ID},Title = ${Title}, Desc = ${Desc}, Img = ${Img}`);
      return <ListPrograms id={ID} key={ID} view={view} title={Title} description={Desc} image={Img} button="Enter"></ListPrograms>
    });
    console.log('list in html dom format is as shown below');
    console.log(List);
    return List;
  }

  setCard(List){
    console.log('state object print');
    console.log(this.props.location.state);
    console.log('**********************');
    // var view = this.props.location.state.view;
    console.log('inside set card');
      List = List.map((program) =>{
        var [ID,Title,Desc,Img] = this.getData(program);
        console.log(`ID = ${ID},Title = ${Title}, Desc = ${Desc}, Img = ${Img}`);
        return <Cols id={ID} key={ID} view={view} title={Title} description={Desc} image={Img} button="Enter"></Cols>
      }
    )

    console.log('card in html dom format is as shown below');
    console.log(List);

      return List;
  }

  getData(program){
    console.log('fetched data from api');
    console.log(program);
    var [ID,Title,Desc,Img] = [null,null,null,null];
    if(view==='programs'){
      ID = program['programID']['_id'];
      Title = program['programID']['programName'];
      Desc = program['programID']['programDescription'];
      Img = program['programID']['programImage'];
    }
    else{
      ID = program['courseID']['courseID'];
      Title = program['courseID']['courseName'];
      Desc = program['courseID']['courseDescription'];
      Img = program['courseID']['image'];
    }

    return [ID,Title,Desc,Img];
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
      var user = localStorage.getItem('mail');

      this.setLayout();

      if(user===null){
        return (<div class="alert alert-warning" role="alert">
            You are not authorized to acces this page!
            </div>);
      }

      // console.log(this.props.location.state.view)
      var doc = null;
      if (this.state.layout === false) {
            console.log('changed to list layout');
             doc =(<div className=" container"> 
               <NavBar/>
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
  </div>)
      } else {
      doc =
        (<div className="container">
              <NavBar/>
            <div class="btn-group w-25 p-3 marged">
  <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="bi bi-display"></i> View
  </button>
  <ul class="dropdown-menu">
  <li onClick={()=>{this.handleLayout(true)}}><i class="bi bi-grid-3x3-gap" ></i> Grid</li>
  <li onClick={()=>{this.handleLayout(false)}}><i class="bi bi-list-task"></i> List</li>
  </ul>
  </div>
      <Rows view={view}>{showList}</Rows>
  </div>);
      }

      console.log('doc is as follows');
      console.log(doc);

        return doc;
  }

}

function Rows(props){

  if(props.view === 'programs')
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

    <LargeCard key={props.id} layout={layoutStyle} id={props.id} title={props.title} description={props.description} button={props.button} image={props.image}>
    </LargeCard>
    </div>);
  }

  return (<div className="col">

      <Card key={props.id} layout={layoutStyle} id={props.id} title={props.title} description={props.description} button={props.button} image={props.image}></Card>
          </div>);
}

export default ProgramCatalog;
