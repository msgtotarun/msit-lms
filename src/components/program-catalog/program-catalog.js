import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import ListPrograms from "../list-programs/list-programs";
import LargeCard from "../Cards/LargeCard/LargeCard";
import { withRouter } from "react-router-dom";
import "./program-catalog.css";

var showList = [];
var view = null;
var layoutStyle = null;
const { REACT_APP_APIBASE_URL } = process.env;
class ProgramCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: false,
      list: [],
      loading: true,
    };
  }
  componentWillMount() {
    var token = localStorage.getItem("token");
    console.log("inside cdm");
    var userID = localStorage.getItem("id");

    if (token === undefined) {
      return;
    }

    // try {
    //   layoutStyle = this.props.location.state.layout;
    // } catch (err) {
    //   if (err.name === "TypeError") {
    //     layoutStyle = this.props.layout;
    //   }
    // }
    layoutStyle = localStorage.getItem('layout');
    if (layoutStyle === undefined | layoutStyle === null){
      localStorage.getItem('layout',true);
      layoutStyle = true;
    }
    else if(layoutStyle === 'true'){
      layoutStyle = true;
    }
    else{
      layoutStyle = false;
    }

    this.getRenderList(userID, token);
    // this.setLayout();
  }

  async getPrograms(userID, token) {
    // example code
    token = localStorage.getItem("token");
    userID = localStorage.getItem("id");
    console.log(process.env.REACT_APP_APIBASE_URL);
    await fetch(
      process.env.REACT_APP_APIBASE_URL +
        "/api/program/get/enrolled_programs/" +
        userID +
        "/?token=" +
        token
    )
      .then((response) => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        // json = json[0]['enrollments'];
        console.log("get programs api fetched");
        console.log(json);
        if (json[0]["enrollments"][0]["programID"] !== null) {
          console.log(json[0]["enrollments"]);
          this.setState({ list: json[0]["enrollments"], layout: layoutStyle,loading: false });
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ loading: true });
      });
  }

  async getCourses(programID, userID, token) {
    token = localStorage.getItem("token");
    userID = localStorage.getItem("id");
    // programID = localStorage.getItem("program");
    programID = this.props.match.params.programId
    console.log(
      `course fetch api = ${process.env.REACT_APP_APIBASE_URL}/api/course/get/courseinfo/${userID}/${programID}/?token=${token}`
    );
    fetch(
      process.env.REACT_APP_APIBASE_URL +
        "/api/course/get/courseinfo/" +
        userID +
        "/" +
        programID +
        "/?token=" +
        token
    ).then((response) => response.text())
    .then((result) => {
        console.log(`course result = ${result}`);
        var json = JSON.parse(result);
        // json = json[0]['enrollments'];
        console.log("course data");
        console.log(json);

        if (json["courses"][0]["courseID"] !== null) {
            json["courses"] = json["courses"].filter((obj) => {
              return obj["courseInstances"][0]["isLive"] === true;
            });
          this.setState({ list: json["courses"], layout: layoutStyle,loading: false }, () => {
            console.log("list state updated");
            console.log(this.state.list);
          });
        }
      })
      .catch((error) => {
        console.log("error", error)
        this.setState({ loading: false });
    });
  }

  handleLayout(value) {
    if (this.state.layout !== value) {
      layoutStyle = value;
      localStorage.setItem('layout',value);
      this.setState({ layout: !this.state.layout });
    }
  }
  nodata() {
    return (
      <div className='nodata container mt-5'>
        <NavBar />
        <div class='alert alert-dark' role='alert'>
          <h4 class='alert-heading'>No {view} to display</h4>
          <p>You are not enrolled in any {view}</p>
          <hr></hr>
          <p class='mb-0'>
            Kindly, contact your mentor to enroll into programs.
          </p>
        </div>
      </div>
    );
  }

  getRenderList(userID, token) {
    console.log("inside get render list");
    try {
      view = this.props.location.state.view;
    } catch (err) {
      if (err.name === "TypeError") {
        view = this.props.view;
      }
    }

    console.log(`userID = ${userID}, props.view = ${view}`);
    console.log(view === "programs");
    if ("programs" === view) {
      this.getPrograms(userID, token);
    } else {
      // var id = localStorage.getItem("program");
      var id = this.props.match.params.programId
      this.getCourses(id, userID, token);
    }
  }

  setList(List) {
    console.log("inside set list function");
    // view = this.props.location.state.view;
    console.log(`view = ${view}`);
    List = List.map((program) => {
      var [ID, Title, Desc, Img] = this.getData(program);
      console.log(
        `List ID = ${ID},Title = ${Title}, Desc = ${Desc}, Img = ${Img}`
      );
      return (
        <ListPrograms
          id={ID}
          key={ID}
          view={view}
          title={Title}
          description={Desc}
          image={Img}
          button='Enter'></ListPrograms>
      );
    });
    List = (<div className='accordion ' id='accordionExample'>{List}</div>)
    console.log("list in html dom format is as shown below");
    console.log(List);
    return List;
  }

  setCard(List) {
    console.log("state object print");
    console.log(this.props.location.state);
    console.log("**********************");
    // var view = this.props.location.state.view;
    console.log("inside set card");
    List = List.map((program) => {
      var [ID, Title, Desc, Img] = this.getData(program);
      console.log(`ID = ${ID},Title = ${Title}, Desc = ${Desc}, Img = ${Img}`);
      return (
        <Cols
          id={ID}
          key={ID}
          view={view}
          title={Title}
          description={Desc}
          image={Img}
          button='Enter'></Cols>
      );
    });

    console.log("card in html dom format is as shown below");
    console.log(List);
    List = (<Rows>{List}</Rows>)
    return List;
  }

  getData(program) {
    console.log("fetched data from api");
    console.log(program);
    var [ID, Title, Desc, Img] = [null, null, null, null];
    if (view === "programs") {
      ID = program["programID"]["_id"];
      Title = program["programID"]["programName"];
      Desc = program["programID"]["programDescription"];
      Img = program["programID"]["programImage"];
    } else {
      ID = program["courseInstances"][0]["_id"];
      Title = program["courseID"]["courseName"];
      Desc = program["courseID"]["courseDescription"];
      Img = program["courseID"]["image"]["image"];
    }
    return [ID, Title, Desc, Img];
  }

  setLayout() {
    var ret = null;
    console.log("set layout list = ");
    console.log(this.state.list);
    console.log(`setlist if check = ${this.state.list === null}`);

    if (this.state.loading === true) {
      ret =  (<div className='container list-card'>
            <NavBar />
                      <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
            </div>);
    }else if (this.state.list.length === 0) {
      ret = this.nodata();
    } else if(view==="programs"){
      console.log("inside set layout");
      console.log(this.state.list);
      showList = this.setCard(this.state.list);
    }else{
      showList = this.setList(this.state.list);
    }

    return ret;
  }

  render() {
    var user = localStorage.getItem("token");
    console.log(`render list =`);
    console.log(this.state.list);
    user ??
      this.props.history.push({
        pathname: "/",
      });

    var value = this.setLayout();
    console.log(`value =`);
    console.log(value);
    if (value !== null) {
      return value;
    }

    // console.log(this.props.location.state.view)
    return (<div className='container list-card'>
          <NavBar />
            {showList}
        </div>);
  }
}

function Rows(props) {
  return <div className='container'>{props.children}</div>;
}

function Cols(props) {
  console.log(props);
  return (
    <>
      <LargeCard
        view={props.view}
        key={props.id}
        layout={layoutStyle}
        id={props.id}
        title={props.title}
        description={props.description}
        button={props.button}
        image={props.image}></LargeCard>
    </>
  );
}

export default withRouter(ProgramCatalog);
