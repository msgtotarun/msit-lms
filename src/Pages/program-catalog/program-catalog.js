import React, { Component } from "react";
import NavBar from '../../components/NavBar/NavBar';
import ListProgram from '../../components/list-programs/list-programs';
import Card from '../../components/Cards/Cards';
import LargeCard from '../../components/Cards/LargeCard/LargeCard';

var showList = [];

class ProgramCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: []
    };
    this.getRenderList();
  }

  async getPrograms(userID) {
    // example code
    try {
      const response = await fetch(process.env.REACT_APP_API+'user/id/?token='+userID);
      const json = await response.json();
      this.setState({ list:json })
    } catch (error) {
      console.log(error)
    }
  }

  getCourses(programID){

  }

  handleLayout(){
    this.setState(prevstate => {layout: !prevstate.layout});
  }

  getRenderList() {
    if ("programs"==this.props.view){
        this.getPrograms(this.props.userid)
    }
    else{
        this.getCourses()
    }
  }

  setList(List){
    showList = List.map(program => {
      return <ListProgram view={this.props.view} title={program['title']} description={program['description']} image={program['image']} button="Enter"></ListProgram>
    });

    return showList;
  }

  setCard(List){
      showList = List.map((program) =>
        <Cols view={this.props.view} title={program['title']} description={program['description']} image={program['image']} button="Enter"></Cols>
      )

      return showList;
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
      console.log(this.props.view)
      var doc = null;
      if (this.state.layout === false) {
             doc =(<div class="container">
                     <select class="form-select" aria-label="Default select example">
                        <option selected > <span>Layout</span> </option>
                        <option value = "grid"> One </option>
                        <option value = "list"> Two </option>
                     </select>
                      {showList}
                    </div>);
      } else {
      doc =
        (<div class="container">
                  <select class="form-select" aria-label="Default select example">
                    <option selected > <span>Layout</span> </option>
                    <option value = "grid"> One </option>
                    <option value = "list"> Two </option>
                  </select>
                  {showList}
                </div>);
      }
        return doc;
  }

}

function Rows(props){

  if(props.view == 'program')
  {
    return (<div class="container">
            <div class="row row-cols-3">
            {props.children}
            </div>
          </div>);
  }

  return (<div class="container">{props.children}</div>);

}

function Cols(props){

  if(props.view !== 'program'){
    return (<div class="row">
    <LargeCard title={props.title} description={props.description} button={props.button} image={props.image}>
    </LargeCard>
    </div>);
  }

  return (<div class="col">
      <Card title={props.title} description={props.description} button={props.button} image={props.image}></Card>
          </div>);
}

export default ProgramCatalog;
