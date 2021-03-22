import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import LargeCard from '../Cards/LargeCard/LargeCard';
import {Link,withRouter} from "react-router-dom";
import './moduleCatalog.css';

var showList = [];
var layoutStyle = null;
const {REACT_APP_APIBASE_URL}=process.env
class moduleCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: null
    };
  }

  componentWillMount() {
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('id');

    console.log('inside cdm')

    if(token === undefined){
      this.props.history.push({
    pathname: '/'
    })
    }

    try{
      layoutStyle = this.props.location.state.layout;
    }
    catch(err){
        if(err.name === 'TypeError')
        {
          layoutStyle = this.props.layout;
        }
    }

    this.getModules(userID,token);
    // this.setLayout();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.setLayout();
  //   return true;
  // }

  async getModules(userID,token) {
    // example code
    token = localStorage.getItem('token');
    userID = localStorage.getItem('id');
   console.log(process.env.REACT_APP_APIBASE_URL)
   await fetch(process.env.REACT_APP_APIBASE_URL+'/api/content/get/content-json/'+userID+'/?token='+token)
  .then(response => response.text())
  .then(result => {
    var json = JSON.parse(result);
    // json = json[0]['enrollments'];
    console.log('get programs api fetched');
    console.log(json['contentJSON']);

    if(json['contentJSON'] !== null){
      this.setState({ list:json['contentJSON'],layout:layoutStyle});
    }

  }).catch(error => console.log('error', error));


  }

  handleLayout(value){
    if (this.state.layout !== value)
    {
      layoutStyle = value;
      this.setState({layout: !this.state.layout});
    }
  }

  setList(List){
    console.log('inside set list function');
    // view = this.props.location.state.view;
    // console.log(`view = ${view}`);
    List = List.map(modules => {
      var [ID,Title,Desc,Con] = this.getData(modules);
      console.log(`List ID = ${ID},Title = ${Title}, Desc = ${Desc}`);
      return <ListPrograms id={ID} key={ID} title={Title} description={Desc} content={Con} button="Enter"></ListPrograms>
    });
    console.log('list in html dom format is as shown below');
    console.log(List);
    return List;
  }

  setCard(List){
    console.log('state object print');
    // console.log(this.props.location.state);
    console.log('**********************');
    // var view = this.props.location.state.view;
    console.log('inside set card');
      List = List.map((modules) =>{
        var [ID,Title,Desc,Con] = this.getData(modules);
        console.log(`ID = ${ID},Title = ${Title}, Desc = ${Desc}`);
        return <LargeCard id={ID} key={ID} title={Title} description={Desc} content={Con} button="Enter"></LargeCard>
      }
    )

    console.log('card in html dom format is as shown below');
    console.log(List);

      return List;
  }

  getData(program){
      console.log('fetched data from api');
      console.log(program);
      var [ID,Title,Desc,Con] = [null,null,null,null];
      ID = program["module_id"]
      Title = program["name"]
      Desc = program["desc"]
      Con = program["content"]
      return [ID,Title,Desc,Con];
  }

  setLayout()
  {

    var ret = null;
    console.log('set layout list = ');
    console.log(this.state.list);
    console.log(`setlist if check = ${this.state.list === null}`);
    if(this.state.list===null|this.state.list === undefined){
      ret = (<div className=" container">
            <NavBar/>
            <div class="alert alert-dark" role="alert">
            <h4 class="alert-heading">No modules to display</h4>
            <p>This course does not have any modules</p>
            <hr></hr>
            <p class="mb-0">Kindly, contact your mentor</p>
          </div>
        </div>);

    }else{
      console.log('inside set layout');
      console.log(this.state.list);
      showList = layoutStyle?this.setCard(this.state.list):this.setList(this.state.list)
      console.log("showlist");
      console.log(showList);
    }

    return ret;
  }

  render() {

      var user = localStorage.getItem('token');
      console.log(`render list =`);
      console.log(this.state.list);
      if(user===null){

        this.props.history.push({
      pathname: '/'
      })

        // return (<div class="alert alert-warning" role="alert">
        //     You are not authorized to acces this page!
        //     </div>);
      }

      var value = this.setLayout();
      console.log(`value =`);
      console.log(value);
      if(value !== null){
        return value;
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
      <div className="container1">{showList}</div>
  </div>);
      }

      console.log('doc is as follows');
      console.log(doc);

        return doc;
  }

}

export default withRouter(moduleCatalog);
