
import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import ListPrograms from "../list-programs/list-programs";
import LargeCard from "../Cards/LargeCard/LargeCard";
import { withRouter } from "react-router-dom";
import "./program-catalog.css";

var showList = [];
var view = null;
var layoutStyle = null;
class ProgramCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: true,
      list: null,
    };
  }
  componentWillMount() {
    var token = localStorage.getItem("token");
    console.log("inside cdm");
    var userID = localStorage.getItem("id");

    if (token === undefined) {
      return;
    }

    try {
      layoutStyle = this.props.location.state.layout;
    } catch (err) {
      if (err.name === "TypeError") {
        layoutStyle = this.props.layout;
      }
    }

    this.getRenderList(userID, token);
    // this.setLayout();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.setLayout();
  //   return true;
  // }

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
        console.log(json[0]["enrollments"]);

        if (json[0]["enrollments"][0]["programID"] !== null) {
          this.setState({ list: json[0]["enrollments"], layout: layoutStyle });
        }
      })
      .catch((error) => console.log("error", error));
  }

  async getCourses(programID, userID, token) {
    token = localStorage.getItem("token");
    userID = localStorage.getItem("id");
    programID = localStorage.getItem("program");
    console.log(
      `course fetch api = ${process.env.REACT_APP_APIBASE_URL}/api/course/get/courseinfo/${userID}/${programID}/?token=${token}`
    );
    await fetch(
      process.env.REACT_APP_APIBASE_URL +
        "/api/course/get/courseinfo/" +
        userID +
        "/" +
        programID +
        "/?token=" +
        token
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(`course result = ${result}`);
        var json = JSON.parse(result);
        // json = json[0]['enrollments'];
        console.log("course data");
        console.log(json);
        if (json["courses"][0]["courseID"] !== null) {
          this.setState({ list: json["courses"], layout: layoutStyle }, () => {
            console.log("list state updated");
            console.log(this.state.list);
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  handleLayout(value) {
    if (this.state.layout !== value) {
      layoutStyle = value;
      this.setState({ layout: !this.state.layout });
    }
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
      var id = localStorage.getItem("program");
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
      ID = program["courseID"]["courseID"];
      Title = program["courseID"]["courseName"];
      Desc = program["courseID"]["courseDescription"];
      Img = program["courseID"]["image"];
    }

    return [ID, Title, Desc, Img];
  }

  setLayout() {
    var ret = null;
    console.log("set layout list = ");
    console.log(this.state.list);
    console.log(`setlist if check = ${this.state.list === null}`);
    if ((this.state.list === null) | (this.state.list === undefined)) {
      ret = (
        <div className=' container'>
          <NavBar />
          <div class='alert alert-dark' role='alert'>
            <h4 class='alert-heading'>No {view} to display</h4>
            <p>You are not enrolled in any programs</p>
            <hr></hr>
            <p class='mb-0'>
              Kindly, contact your mentor to enroll into programs.
            </p>
          </div>
        </div>
      );
    } else {
      console.log("inside set layout");
      console.log(this.state.list);
      showList = layoutStyle
        ? this.setCard(this.state.list)
        : this.setList(this.state.list);
      console.log("showlist");
      console.log(showList);
    }

    return ret;
  }

  render() {
    var user = localStorage.getItem("token");
    console.log(`render list =`);
    console.log(this.state.list);
    if (user === null) {
      return (
        <div class='alert alert-warning' role='alert'>
          You are not authorized to acces this page!
        </div>
      );
    }

    var value = this.setLayout();
    console.log(`value =`);
    console.log(value);
    if (value !== null) {
      return value;
    }

    // console.log(this.props.location.state.view)
    var doc = null;
    if (this.state.layout === false) {
      console.log("changed to list layout");
      doc = (
        <div className='container list-card'>
          <NavBar />
          <div class='btn-group w-18 marged'>
            <button
              class='btn btn-light btn-sm dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <i class='bi bi-display'></i> View
            </button>
            <ul class='dropdown-menu'>
              <li
                onClick={() => {
                  this.handleLayout(true);
                }}>
                <i class='bi bi-grid-3x3-gap'></i> Grid
              </li>
              <li
                onClick={() => {
                  this.handleLayout(false);
                }}>
                <i class='bi bi-list-task'></i> List
              </li>
            </ul>
          </div>
          <div className='accordion ' id='accordionExample'>
            {showList}
          </div>
        </div>
      );
    } else {
      doc = (
        <div className='container grid-card'>
          <NavBar />
          <div class='btn-group w-18 marged'>
            <button
              class='btn btn-light btn-sm dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <i class='bi bi-display'></i> View
            </button>
            <ul class='dropdown-menu'>
              <li
                onClick={() => {
                  this.handleLayout(true);
                }}>
                <i class='bi bi-grid-3x3-gap'></i> Grid
              </li>
              <li
                onClick={() => {
                  this.handleLayout(false);
                }}>
                <i class='bi bi-list-task'></i> List
              </li>
            </ul>
          </div>
          <Rows view={view}>{showList}</Rows>
        </div>
      );
    }

    console.log("doc is as follows");
    console.log(doc);

    return doc;
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

