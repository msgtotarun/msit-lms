import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { Link, withRouter } from "react-router-dom";
import SideList from "./sideList";
import "./moduleCatalog.css";

var dropDownItems = "";
var moduleToDisplay = "";
class moduleCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      list: null,
      loading: true,
    };
    this.setModule = this.setModule.bind(this);
  }
  componentDidMount() {
    var token = localStorage.getItem("token");
    // let courseId = window.location.pathname.replace("/modules-catalog/", "");
    let courseId = this.props.match.params.courseId;
    // console.log("cid " + courseId);

    let link = `${process.env.REACT_APP_APIBASE_URL}/api/content/get/content-json/${courseId}/?token=${token}`;
    console.log(link);
    fetch(link, {
      method: "get",
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("result = ");
        console.log(result);
        var json = JSON.parse(result);
        // console.log(json.contentJSON[0]);
        if (json.contentJSON !== "undefined") {
          this.setState({ list: json.contentJSON, loading: false });
        }
      })
      .catch((error) => console.log("error", error));
  }

  setDropList(list) {
    dropDownItems = list.map((module) => {
      return (
        <SideList
          key={module["name"]}
          name={module["name"]}
          module={JSON.stringify(module)}
          ModuleList={this.setListModules(module.content)}
          desc={this.setModule}></SideList>
      );
    });
  }

  setDescription(descript) {
    descript = JSON.parse(descript);
    var description = descript["activity_json"];
    var html = "<div>";
    description.forEach((desc) => {
      console.log(desc);
      // html =
      //   html +
      //   "<p className='fs-2 text-start'> Activity ID:" +
      //   descript["activity_id"] +
      //   "</p>";
      html = "<h1>" + html + desc["title"] + "</h1><br></br>";
      if (desc["text"] !== undefined) {
        html = html + desc["text"] + "<br></br>";
      } else {
        html =
          html + desc["questions"][0]["questionText"][0]["text"] + "<br></br>";
      }
    });
    html = html + "</div>";

    this.setState({ desc: html });
  }

  setListModules(contents) {
    let ModuleItem = (props) => {
      return (
        <li className='sidebar_li'>
          <a
            className='text-truncate'
            onClick={() => this.setDescription(props.content)}>
            {props.activity}
          </a>
        </li>
      );
    };
    // console.log('set list modules contents');
    // console.log(contents);
    moduleToDisplay = contents.map((content) => {
      return (
        <ModuleItem
          content={JSON.stringify(content)}
          key={content.activity_name}
          activity={content.activity_name}></ModuleItem>
      );
    });
    return moduleToDisplay;
  }

  setModule(mod) {
    mod = JSON.parse(mod);
    this.setState({ desc: mod["desc"] });
  }

  render() {
    if (this.state.loading) {
      return <NavBar></NavBar>;
    }

    this.setDropList(this.state.list);
    return (
      <div>
        <NavBar></NavBar>

        <aside>
          <div className='accordion ' id='accordionExample'>
            {dropDownItems}
          </div>
        </aside>
        <main>
          <div
            className='contentarea'
            dangerouslySetInnerHTML={{ __html: this.state.desc }}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(moduleCatalog);
