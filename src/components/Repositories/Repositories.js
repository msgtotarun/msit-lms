import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import "./Repositories.css";

var showList = [];
var layoutStyle = null;
// var client = null
const clientID = process.env.REACT_APP_GITHUB_CLIENT;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
const { REACT_APP_APIBASE_URL } = process.env;
class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      list: null,
      loading: true,
    };
  }

  componentWillMount() {
    var userID = localStorage.getItem("id");
    this.getClient(userID);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.setLayout();
  //   return true;
  // }

  getClient(userID) {
    userID = localStorage.getItem("id");
    console.log("link to check if token exists");
    console.log(process.env.REACT_APP_API_URL2 + "/clientcheck/" + userID);
    fetch(process.env.REACT_APP_API_URL2 + "/clientcheck/" + userID)
      .then((response) => response.text())
      .then((result) => {
        console.log("user github token check =");
        result = JSON.parse(result);
        console.log("befor getting client");
        console.log(result);
        console.log("after getting client");
        var client = result["client"];
        console.log(client);
        if ((client !== "") & (client !== null) & (client !== undefined)) {
          this.getRepos(client);
        } else {
          console.log("Bad credentials recived in github api");
          showList = null;
          this.setState({ loading: false });
        }
      })
      .catch((error) => console.log("error", error));
  }

  repolistmapper(result) {
    showList = result.map((repo) => {
      // console.log('in repo mapper');
      var title = repo["name"];
      var sub = repo["full_name"];
      var rlink = repo["html_url"];
      var desc = repo["description"];

      return (
        <div key={rlink} class='col'>
          <div class='card repocard'>
            <div class='card-body'>
              <p class='fs-5 text-truncated'>
                <i class='bi bi-github'></i> {title}
              </p>
              <p class='fs-6 text-truncated'>{sub}</p>
              <p class='card-text text-truncate'>
                <i class='bi bi-info-circle'></i> {desc}
              </p>
              <i class='bi bi-link-45deg'></i>{" "}
              <a
                href='#'
                onClick={() => {
                  window.open(rlink, "_blank");
                }}
                class='card-link text-truncate'>
                Redirect to Repository
              </a>
            </div>
          </div>
        </div>
      );

      // return (<repoCard key={rlink} title={title} rlink={rlink} desc={desc} sub={sub}></repoCard>);
    });
    console.log("showlist = ");
    console.log(showList);
  }

  setRender() {
    var html = null;
    var response = "";
    if (showList === null) {
      html = (
        <div class='card mb-3 customcard'>
          <div class='col-md-8'>
            <div class='card-body'>
              <div class='input-group mb-3 position-relative'>
                <button
                  class='btn btn-primary position-absolute top-50 start-50 translate-middle'
                  onClick={() => {
                    window.location =
                      "https://github.com/login/oauth/authorize?client_id=" +
                      clientID;
                  }}>
                  Authorize
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      response = "No token present for user";
    } else if (Array.isArray(showList) && showList.length === 0) {
      html = (
        <div class='card mb-3 customcard'>
          <div class='col-md-8'>
            <div class='card-body'>
              <p class='fs-1 text-center'>No repositories to display</p>
            </div>
          </div>
        </div>
      );
      response = "No repositories to diplay";
    } else {
      html = (
        <div class='container'>
          <div class='overflow-scroll'>
            <div className='row row-cols-1 row-cols-md-3 g-4'>{showList}</div>
          </div>
        </div>
      );
      response = "repositories available for user";
    }

    console.log("response = ", response);

    return html;
  }

  getRepos(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    // myHeaders.append("withCredentials", true)
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://api.github.com/user/repos", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        result = JSON.parse(result);
        // response_status = result['message']
        console.log("repos fetched");
        console.log(result);
        console.log("check if message exists");
        console.log(result["message"]);
        if (result["message"] == undefined) {
          this.repolistmapper(result);
          this.setState({ loading: false });
        } else {
          console.log("Bad credentials received in github api");
          showList = null;
          this.setState({ loading: false });
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    // console.log('response status = ',response_status);
    console.log("loading = ", this.state.loading);
    if (this.state.loading) {
      return (
        <div class='spinner-border' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      );
    }

    return this.setRender();
  }
}

function repoCard(props) {
  return (
    <div class='col'>
      <div class='card repocard'>
        <div class='card-body'>
          <h5 class='card-title'>{props.title}</h5>
          <h6 class='card-subtitle mb-2 text-muted'>{props.sub}</h6>
          <p class='card-text'>{props.desc}</p>
          <a href='#' class='card-link'>
            {props.rlink}
          </a>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Repositories);
