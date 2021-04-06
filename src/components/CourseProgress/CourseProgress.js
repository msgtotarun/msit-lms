import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";

var programSelect = [];
var courseSelect = [];
var view = "Program";
const token = localStorage.getItem("token");
const userID = localStorage.getItem("id");

class CourseProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programId: "",
      courseId: "",
      programList: null,
      loading: false,
      courseList: null,
    };
  }
  componentDidMount() {
    console.log("inside cdm");

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

    this.getRenderList(userID, token);
    // this.setLayout();
  }

  getRenderList(userID, token) {
    console.log("inside get render list");
    // try {
    //   view = this.props.location.state.view;
    // } catch (err) {
    //   if (err.name === "TypeError") {
    //     view = this.props.view;
    //   }
    // }

    // console.log(`userID = ${userID}, props.view = ${view}`);
    // console.log(view === "program");
    // if ("programs" === view) {
    this.getPrograms(userID, token);
    // } else {
    // var id = localStorage.getItem("programID");
    // this.getCourses(id, userID, token);
    // }
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

        if (json[0]["enrollments"][0]["programID"] !== null) {
          // console.log(json[0]["enrollments"]);
          this.setState({ programList: json[0]["enrollments"] });
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ loading: true });
      });
  }

  async getCourses(programid) {
    console.log(
      `course fetch api = ${process.env.REACT_APP_APIBASE_URL}/api/course/get/courseinfo/${userID}/${this.state.programid}/?token=${token}`
    );
    fetch(
      process.env.REACT_APP_APIBASE_URL +
        "/api/course/get/courseinfo/" +
        userID +
        "/" +
        programid +
        "/?token=" +
        token
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(`course result = ${result}`);
        var json = JSON.parse(result);
        // filtering isLive objects
        if (json["courses"][0]["courseID"] !== null) {
          json["courses"] = json["courses"].filter((obj) => {
            return obj["courseInstances"][0]["isLive"] === true;
          });
          // console.log("before setstate");
          this.setState({ courseList: json["courses"] }, () => {
            console.log("course list state updated");
            console.log("courselist", this.state.courseList);
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
  nodata() {
    return (
      <div className='nodata container mt-5'>
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
  }
  getData(program, isprogram) {
    // console.log("fetched data from api");
    // console.log(program);
    var [ID, Title] = [null, null];
    if (isprogram) {
      ID = program["programID"]["_id"];
      Title = program["programID"]["programName"];
    } else {
      ID = program["courseInstances"][0]["_id"];
      Title = program["courseID"]["courseName"];
    }
    return [ID, Title];
  }
  setData(program) {
    var ret = null;
    if (!this.state.programList) {
      // console.log();
      if (this.state.loading) {
        ret = this.nodata();
      }
    }
    //  console.log("select program",programSelect);
    else if (program && programSelect.length === 0) {
      // console.log("select program",programSelect);
      programSelect = this.setDropDown(this.state.programList, true);
      //  console.log("programSelect",programSelect);
    }

    return ret;
  }
  setDropDown(List, isProgram) {
    console.log("list:", List);
    let Li = (props) => {
      //  console.log(props.Id);
      return <option value={props.Id}>{props.title}</option>;
    };
    if (isProgram) {
      List = List.map((program) => {
        var [ID, Title] = this.getData(program, true);
        // console.log("Title:",Title);

        return <Li key={ID} title={Title} Id={ID}></Li>;
      });
    } else {
      List = List?.map((course) => {
        var [ID, Title] = this.getData(course, false);
        console.log("Title:", Title);

        return <Li key={ID} title={Title} Id={ID}></Li>;
      });
    }
    return List;
  }

  render() {
    // var ret = null;
    var user = localStorage.getItem("token");
    // console.log(`render list =`);
    // console.log(this.state.list);
    user ??
      this.props.history.push({
        pathname: "/",
      });

    var data = this.setData(true);
    if (data !== null) {
      return data;
    }

    let programSelectData = (
      <div>
        <NavBar />
        <select
          value={this.state.programId}
          class='form-select form-select-sm program select'
          aria-label='.form-select-sm example'
          disabled={this.state.programId}
          onChange={(e) => {
            this.setState({ programId: e.target.value }, () => {
              if (this.state.programId !== "") {
                if (!this.state.courseList) {
                  // this.setState({loading:false}) ;
                  this.getCourses(this.state.programId);
                  console.log("courselist in render", this.state.courseList);
                }
              }
            });
          }}>
          <option>Select Your Program</option>
          {programSelect}
        </select>
      </div>
    );

    // var coursedata = this.courseSelectData;

    // console.log("coursedata:",courseList);
    if (this.state.courseList) {
      courseSelect = this.setDropDown(this.state.courseList, false);
      var courseSelectData = "";
      if (courseSelect?.length > 0) {
        courseSelectData = (
          <div>
            <select
              value={this.state.courseId}
              disabled={this.state.courseId}
              class='form-select form-select-sm courseselect'
              aria-label='.form-select-sm course'
              onChange={(e) => {
                this.setState({ courseId: e.target.value });
              }}>
              <option>Select Your Course</option>
              {courseSelect}
            </select>
          </div>
        );
      } else {
        alert("no Course found");
      }
    }
    return (
      <div>
        {programSelectData}
        {courseSelectData}
        {this.state.programId && (
          <div>
            <button
              type='submit'
              class='btn btn-xs btn-default'
              onClick={() => {
                courseSelect = "";

                this.setState({
                  programId: "",
                  courseId: "",
                  courseList: null,
                });
              }}>
              Back
            </button>
            {this.state.courseId && (
              <button type='submit' class='btn btn-xs btn-default'>
                Enter
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CourseProgress);
