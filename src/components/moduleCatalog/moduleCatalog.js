import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import Quiz from './Quiz/Quiz';
import SideBar from "./sideBar";
import dompurify from "dompurify";
import ReactPlayer from "react-player";
import "./moduleCatalog.css";

var dropDownItems = "";
var descType = "";
var content = "";
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
      desc: "",
      list: null,
      loading: true,
      submitLink: "",
    };
    this.setModuleDesc = this.setModuleDesc.bind(this);
    this.setSubModuleDesciption = this.setSubModuleDesciption.bind(this);
    this.state.submission = this.submission.bind(this);
    this.submitNow = this.submitNow.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    // let courseId = window.location.pathname.replace("/modules-catalog/", "");
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
    // ReactDOM.render("",document.getElementById('content'));
    descript = JSON.parse(descript);
    // console.log(descript);
    var description = descript["activity_json"];
    console.log(description);
    console.log(`switch assignment condition ${(description[0]['activityType']=== "assignment")}`);
    if(description[0]['activityType']==="quiz"){
      description = JSON.stringify(description);
      content = (<Quiz mid={moduleId}>{description}</Quiz>);
      ReactDOM.render(content,document.getElementById('content'));
    }else if(description[0]['activityType']==="assignment"){
      console.log('in assignment case');
        activityId = descript["activity_id"];
        var html = "<div>";
        description.forEach((desc) => {
          console.log(desc);
          html = "<h1>" + html + desc["title"] + "</h1><br></br>";
          if (desc["text"] !== undefined) {
            html = html + desc["text"];
            descType = "";
          } else if (desc["questions"] ?? [0] === "undefined") {
            descType = desc["questions"][0]["questionType"];
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
        content = (
          <div className="container">
          <div
          className='contentarea'
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(html),
          }}
        />
        <div>{this.submission()}</div>
        </div>);
        ReactDOM.render(content,document.getElementById('content'));
    }else if(description[0]['activityType']==="notes"){
      console.log('notes');
        activityId = descript["activity_id"];
        var html = "<div>";
        description.forEach((desc) => {
          console.log(desc);
          html = "<h1>" + html + desc["title"] + "</h1><br></br>";
          if (desc["text"] !== undefined) {
            html = html + desc["text"];
            descType = "";
          }
        });
          html = html + "</div>";
        content = (
          <div className="container">
          <div
          className='contentarea'
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(html),
          }}
        />
        </div>);
        ReactDOM.render(content,document.getElementById('content'));
    }

    else if(description[0]['activityType']==="youtubevideo"){
      console.log('youtube vedio');
        activityId = descript["activity_id"];   
        var html = "<div>";
        description.forEach((desc) => {
          console.log(desc);
          html = "<h1>" + html + desc["title"] + "</h1><br></br>"; 
        });
        html = html + "</div>";
        var vedio = "<div>";
        description.forEach((desc) => {
          //console.log(desc);;
          (description[0]['activityType']==="youtubevideo")?
          vedio =  "https://www.youtube.com/watch?v=" + desc['videoURL']:vedio = desc['videoURL'];
          console.log(vedio);
        });
        vedio = vedio +"</div>"
        
        content = (
          <div>
            <div
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(html),
          }}
          />
          <div className="reactplayer">
          <ReactPlayer url={vedio} />
          </div>
           
        </div>);
        ReactDOM.render(content,document.getElementById('content'));
    }

    this.setState({ loading: false });

  }

  submission() {
    // console.log("DESC", descType);
    if (descType === "filesubmission") {
      let submitLink = (
        <div className='submission'>
          <form>
            <input
              id="submit"
              className='submitBox'
              type='text'
              name='submitLink'
              placeholder='paste your submission link here'
            />
            <button id='link-submit' type='button' onClick={this.submitNow}>
              submit
            </button>
          </form>
        </div>
      );
      descType = "";
      return submitLink;
    } else return "";
  }
  submitNow() {
    console.log(" submission link =",document.getElementById('submit').value);
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
        assignment: document.getElementById('submit').value,
      },
      maxMarks: maxMarks,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_APIBASE_URL}/api/activityresponse/insert/?token=${localStorage.getItem('token')}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  setModuleDesc(mod) {
    console.log("mod =",mod);
    descType = "";
    content = (
      <div className="container">
      <div
      className='contentarea'
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(mod['desc']),
      }}
    />
    <div>{this.submission()}</div>
    </div>);
    this.setState({ loading: false });
  }

  render() {
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
        <main id="content">
        {content}
        </main>
      </div>
    );
  }
}

export default withRouter(moduleCatalog);
