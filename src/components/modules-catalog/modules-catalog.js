import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import "./modules-catalog.css";
var token = null;
var main = [];
class ModulesCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      loading: true,
    };
  }
  componentDidMount() {
    token = localStorage.getItem("token");
    let courseId = window.location.pathname.replace("/modules-catalog/", "");
    // console.log("cid " + courseId);

    let link = `${process.env.REACT_APP_APIBASE_URL}/api/content/get/content-json/${courseId}/?token=${token}`;
    console.log(link);
    fetch(link, {
      method: "get",
    })
      .then((response) => response.text())
      .then((result) => {
        var json = JSON.parse(result);
        // console.log(json.contentJSON[0]);
        if (json.contentJSON !== "undefined")
          this.setState({ list: json.contentJSON, loading: false });
      })
      .catch((error) => console.log("error", error));
  }
  setModule(list) {
    return (
      <>
        <ul>
          {list.map((module) => {
            // console.log(module.name);
            let id = `#${module.name}`;

            return (
              <>
                <li className='sidebar_li'>
                  <a href={id}>{module.name}</a>
                </li>
                {/* {main.push({ key: id, text: module.desc })} */}

                {module.content.map((subModule) => {
                  let subid = `#${id}/${subModule.activity_name}`;
                  return (
                    <li className='sidebar_li'>
                      <a href={subid}>{subModule.activity_name}</a>
                      {/* {main.push({
                        key: subid,
                        text: subModule.activity_json[0].text,
                      })} */}
                    </li>
                  );
                })}
              </>
            );
          })}
        </ul>
      </>
    );
  }
  render() {
    if (this.state.loading) return <Navbar />;
    var moduleToDisplay = this.setModule(this.state.list);
    return (
      <>
        <Navbar />

        <aside>
          <div className='sidebar'>{moduleToDisplay}</div>
        </aside>
        <main>
          <div id='main'>{main}</div>
        </main>
      </>
    );
  }
}

export default ModulesCatalog;
