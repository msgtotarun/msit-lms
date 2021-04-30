import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";
import Quiz from "./Quiz/Quiz";
import SideBar from "./sideBar";
import dompurify from "dompurify";
import "./moduleCatalog.css";
import { ReactVideo, YoutubePlayer } from "reactjs-media";

var dropDownItems = "";
var moduleDescription;
let courseInstanceId,
  programId,
  courseId,
  activityId,
  questionId,
  moduleId,
  maxMarks,
  activityType;

class moduleCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      loading: true,
    };
    this.setModuleDesc = this.setModuleDesc.bind(this);
    this.setSubModuleDesciption = this.setSubModuleDesciption.bind(this);
    // this.state.submission = this.submission.bind(this);
    this.submitNow = this.submitNow.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    courseInstanceId = this.props.match.params.courseInstanceId;
    courseId = this.props.match.params.courseId;
    programId = this.props.match.params.programId;
    console.log(courseId, programId);

    let link = `${process.env.REACT_APP_APIBASE_URL}/api/content/get/content-json/${courseInstanceId}/?token=${token}`;
    console.log(link);
    fetch(link, {
      method: "get",
    })
      .then((response) => response.text())
      .then((result) => {
        // console.log("result = ");
        // console.log(result);
        var json = JSON.parse(result);
        // console.log(json.contentJSON[0]);
        if (json.contentJSON !== "undefined") {
          this.setState({ list: json.contentJSON, loading: false });
        }
      })
      .catch((error) => console.log("error", error));
  }

  SetSideBar(list) {
    var sid = 0;
    dropDownItems = list.map((module) => {
      ++sid;
      return (
        <SideBar
          id={module["module_id"]}
          key={module["module_id"]}
          name={module["name"]}
          module={module}
          moduleContent={module.content}
          subModuledesc={this.setSubModuleDesciption}
          desc={this.setModuleDesc}
          sid={sid}></SideBar>
      );
    });
  }

  setSubModuleDesciption(Id, descript) {
    moduleId = Id;
    descript = JSON.parse(descript);
    // console.log(descript);
    var description = descript["activity_json"];
    console.log(description);
    console.log(
      `switch assignment condition ${
        description[0]["activityType"] === "assignment"
      }`
    );
    if (description[0]["activityType"] === "quiz") {
      description = JSON.stringify(description);
      moduleDescription = <Quiz mid={moduleId}>{description}</Quiz>;
    } else if (description[0]["activityType"] === "assignment") {
      console.log("in assignment case");
      activityId = descript["activity_id"];
      var html = "<div>";
      description.forEach((desc) => {
        console.log(desc);
        html = "<h1>" + html + desc["title"] + "</h1><br></br>";
        if (desc["text"] !== undefined) {
          html = html + desc["text"];
        } else if (desc["questions"]?.[0]) {
          questionId = desc["questions"][0]["question_id"];
          activityType = desc["activityType"];
          console.log("qsId", questionId);
          maxMarks = desc["questions"][0]["max_marks"];
          html =
            html +
            desc["questions"][0]["questionText"][0]["text"] +
            "</a><br><br>" +
            "Max marks: " +
            desc["questions"][0]["max_marks"];
        }
      });
      html = html + "</div>";

      moduleDescription = (
        <div className='container'>
          <div
            className='contentarea'
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(html),
            }}
          />
          <div>{this.submission()}</div>
        </div>
      );
      // console.log("submod,:", moduleDescription);
    } else if (description[0]["activityType"] === "notes") {
      console.log("notes");
      activityId = descript["activity_id"];
      html = "<div>";
      description.forEach((desc) => {
        console.log(desc);
        html = "<h1>" + html + desc["title"] + "</h1><br></br>";
        if (desc["text"] !== undefined) {
          html = html + desc["text"];
        }
      });
      html = html + "</div>";
      moduleDescription = (
        <div className='container'>
          <div
            className='contentarea'
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(html),
            }}
          />
        </div>
      );
    } else if (
      description[0]["activityType"] === "youtubevideo" ||
      description[0]["activityType"] === "video"
    ) {
      console.log("youtube vedio");
      activityId = descript["activity_id"];
      html = "<div>";
      description.forEach((desc) => {
        console.log(desc);
        html = "<h1>" + html + desc["title"] + "</h1><br></br>";
      });
      html = html + "</div>";
      var vedio = "";
      description.forEach((desc) => {
        if (description[0]["activityType"] === "youtubevideo") {
          vedio = "https://youtu.be/" + desc["videoURL"];

          moduleDescription = (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(html),
                }}
              />
              <div className='player-wrapper'>
                <YoutubePlayer
                  src={vedio} // Reqiured
                  allowFullScreen='true'
                  width={850}
                  height={600}
                />
              </div>
            </div>
          );
        } else {
          vedio = desc["videoURL"];
          moduleDescription = (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(html),
                }}
              />
              <div className='player-wrapper'>
                <ReactVideo
                  src={vedio} // Reqiured
                  width={650}
                  height={600}
                  primaryColor='red'
                  type='video/mp4'
                  allowFullScreen='true'
                />
              </div>
            </div>
          );
        }
      });
    }
    this.setState({ loading: false });
  }
  async checkPreviousSubmission() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch(
      `${
        process.env.REACT_APP_APIBASE_URL
      }/api/activityresponse/latest/${localStorage.getItem(
        "id"
      )}/${programId}/${courseId}/${courseInstanceId}/${moduleId}/${activityId}/${questionId}?token=${localStorage.getItem(
        "token"
      )}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  submission() {
    if (activityType === "assignment") {
      let check = this.checkPreviousSubmission;
      let submitLink = (
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
    } else return "";
  }
  async submitNow() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      programId: programId,
      courseInstanceId: courseInstanceId,
      courseId: courseId,
      moduleId: moduleId,
      activityType: activityType,
      activityId: activityId,
      questionId: questionId,
      response: {
        assignment: document.getElementById("submitLink").value,
      },
      maxMarks: maxMarks,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
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
        activityType = "";
      })
      .catch((error) => console.log("error", error));
  }

  setModuleDesc(mod) {
    mod = JSON.parse(mod);
    // console.log("in desc");
    moduleDescription = (
      <div className='container'>
        <div
          className='contentarea'
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(mod["desc"]),
          }}
        />
      </div>
    );
    this.setState({ loading: false });
  }

  render() {
    console.log("module render");
    if (this.state.loading) {
      return <NavBar></NavBar>;
    }

    this.SetSideBar(this.state.list);
    return (
      <div>
        <NavBar></NavBar>
        <aside id='aside'>
          <div className='accordion ' id='accordionExample'>
            {dropDownItems}
          </div>
        </aside>
        <main id='content'>{moduleDescription}</main>
      </div>
    );
  }
}

export default withRouter(moduleCatalog);
