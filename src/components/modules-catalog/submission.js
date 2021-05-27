import { render } from "enzyme";
import React, { Component } from "react";
import { withRouter } from "react-router";

var moduleData = "";
class submission extends Component {
  constructor(props) {
    super(props);
    moduleData = JSON.parse(props.data);
    console.log("moduleData:", moduleData);
    this.state = {
      verifySubmission: "",
    };
    this.submitNow = this.submitNow.bind(this);
  }
  async verifySubmission() {
    console.log("verify submit");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch(
      `${
        process.env.REACT_APP_APIBASE_URL
      }/api/activityresponse/latest/${localStorage.getItem("id")}/${
        moduleData.programId
      }/${moduleData.courseId}/${moduleData.courseInstanceId}/${
        moduleData.moduleId
      }/${moduleData.activityId}/${
        moduleData.questionId
      }?token=${localStorage.getItem("token")}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        if (this.state.verifySubmission === "")
          this.setState({ verifySubmission: result.evaluationStatus });
      })
      .catch((error) => console.log("error", error));
  }

  async submitNow() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    moduleData = {
      ...moduleData,
      response: {
        assignment: document.getElementById("submitLink").value,
      },
    };
    // console.log(moduleData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(moduleData),
      redirect: "follow",
    };

    await fetch(
      `${
        process.env.REACT_APP_APIBASE_URL
      }/api/activityresponse/insert/?token=${localStorage.getItem("token")}`,
      requestOptions
    )
      .then((response) => {
        response.text();
        //this.setState({ verifySubmission: "" });
        this.setState({ verifySubmission: "" });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    this.verifySubmission();

    console.log("verify submit: ", this.state.verifySubmission);
    if (
      moduleData.activityType === "assignment" &&
      this.state.verifySubmission === ""
    ) {
      const submitLink = (
        <div className='submission'>
          <form autoComplete='off'>
            <input
              className='submitBox'
              type='text'
              name='submitLink'
              id='submitLink'
              placeholder='paste your submission link here'
            />
            <button id='link-submit' type='button' onClick={this.submitNow}>
              submit
            </button>
          </form>
        </div>
      );
      return submitLink;
    } else return "already submitted";
  }
}

export default withRouter(submission);
