import React, { Component } from "react";
import NavBar from '../../components/NavBar/NavBar';
import ListProgram from '../../components/list-programs/list-programs';
import Card from '../../components/Cards/Cards';
import LargeCard from '../../components/Cards/LargeCard/LargeCard';

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
    this.setState({layout: false});
  }

  getRenderList() {
    if ("programs"==this.props.view){
        this.getPrograms(this.props.userid)
    }
    else{
        this.getCourses()
    }
  }

  setList(){

  }

  setCard(List){

      List.map(program => {
        return <Cols view={this.props.view} title={program['title']} description={program['description']} image={program['image']} button="Enter"><Cols/>
      });

      return List;
  }

  setLayout()
  {
      var copyList = this.state.list;
      if(this.state.layout){
         return this.setCard(copyList)
      }
  }

  render() {

    list = this.setLayout();

    return (<select class="form-select" aria-label="Default select example">
              <option selected > <span>Layout</span> </option>
              <option value = "grid"> One </option>
              <option value = "list"> Two </option>
            </select>
            <div class="container">
            <Rows>{list}<Rows/>
            </div>);
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

  if(props.view != 'program'){
    return (<div class="row">
    <LargeCard title={props.title} description={props.description} button={props.button} image={props.image}>
    <LargeCard/>
    </div>);
  }

  return (<div class="col">
      <Card title={props.title} description={props.description} button={props.button} image={props.image}><Card/>
          </div>);
}

export default ProgramCatalog;
