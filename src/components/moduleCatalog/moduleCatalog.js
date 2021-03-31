import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { withRouter } from "react-router-dom";
import SideBar from "./sideBar";
import "./moduleCatalog.css";

var dropDownItems = "";

class moduleCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      list: null,
      loading: true,
    };
    this.setModuleDesc = this.setModuleDesc.bind(this);
    this.setSubModuleDesciption = this.setSubModuleDesciption.bind(this);
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

  SetSideBar(list) {
    var sid = 0;
    dropDownItems = list.map((module) => {
      ++sid;
      return (
        <SideBar
          key={module["name"]}
          name={module["name"]}
          module={module}
          moduleContent={module.content}
          subModuledesc={this.setSubModuleDesciption}
          desc={this.setModuleDesc}
          sid={sid}></SideBar>
      );
    });
  }

  setSubModuleDesciption(descript) {
    descript = JSON.parse(descript);
    var description = descript["activity_json"];
    var html = "<div>";
    description.forEach((desc) => {
      console.log(desc);
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

  setModuleDesc(mod) {
    mod = JSON.parse(mod);
    this.setState({ desc: mod["desc"] });
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
