import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ListPrograms from '../list-programs/list-programs';
import LargeCard from '../Cards/LargeCard/LargeCard';
import {Link,withRouter} from "react-router-dom";
import './moduleCatalog.css';

var dropDownItems = "";
var moduleToDisplay = "";
var selected = "Select Module"
const {REACT_APP_APIBASE_URL}=process.env
class moduleCatalog extends Component {
  constructor(props) {
      super(props);
      this.state = {
        desc: "",
        list: null,
        loading: true,
      };
    }
    componentDidMount() {
      var token = localStorage.getItem("token");
      // let courseId = window.location.pathname.replace("/modules-catalog/", "");
      let courseId = this.props.match.params.courseId
      // console.log("cid " + courseId);

      let link = `${process.env.REACT_APP_APIBASE_URL}/api/content/get/content-json/${courseId}/?token=${token}`;
      console.log(link);
      fetch(link, {
        method: "get",
      })
        .then((response) => response.text())
        .then((result) => {
          console.log('result = ');
          console.log(result);
          var json = JSON.parse(result);
          // console.log(json.contentJSON[0]);
          if (json.contentJSON !== "undefined")
          {
            this.setState({ list: json.contentJSON, loading: false });
          }
        })
        .catch((error) => console.log("error", error));
    }

    setDropList(list) {
      if(selected !== "Select Module"){
        list.filter(item =>{
          return item['name'] !== selected
        })
      }

      list.map((module) => {
        return (<li><a class="dropdown-item" onClick={()=>{this.setModule(module)}}>{module['name']}</a></li>);
      });

      dropDownItems = list

    }

    setDescription(descript){
      var html = "<h1>"
      descript.forEach((desc)=>{
        html = html + desc['title']+"</h1><br></br>";
        html = html + desc['text']+"<br></br>"
      })

      this.setState({desc:html})
    }

    setListModules(contents){
      moduleToDisplay = contents.map(content =>{
      return (<li className='sidebar_li'>
              <a onClick={()=>{this.setDescription(content['activity_json'])}}>{content.activity_name}</a>
              </li>);
      })
    }

    setModule(mod){
      selected = mod['name'];
      this.setListModules(mod['content']);
      this.setState({desc: mod['desc']});
    }

    render() {
      if (this.state.loading) {
        return (<NavBar></NavBar>);
      }

      this.setDropList(this.state.list)
      return (
        <div>
          <NavBar></NavBar>

          <aside>
            <div className='sidebar'>
            <div class="btn-group">
  <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {selected}
  </button>
  <ul class="dropdown-menu">
    {dropDownItems}
  </ul>
</div>
            {moduleToDisplay}
            </div>
          </aside>
          <main>
          <div dangerouslySetInnerHTML={{__html: this.state.desc}} />
          </main>
        </div>
      );
    }
}

export default withRouter(moduleCatalog);
