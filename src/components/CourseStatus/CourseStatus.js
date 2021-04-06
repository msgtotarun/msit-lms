import React, { Component } from "react";
import NavBar from '../NavBar/NavBar';
import ReactDOM from 'react-dom';


var pid = "";
var cid = "";
var ptitle = "Select Program";
var ctitle = "Select Course";
var loading = true;
class CourseStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plist: [],
      clist:[],
      cselect:""
    };
  }

  componentWillMount(){
    this.getPrograms();
    setInterval(this.chartAuthorize, 30000);
  }

  async chartAuthorize(){

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(process.env.REACT_APP_API_URL2+`/auth/${localStorage.getItem('id')}/${localStorage.getItem("token")}`, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)})
        .catch(error => console.log('error', error));

  }


  getPrograms() {
    var token = localStorage.getItem("token");
    var userID = localStorage.getItem("id");
    console.log(process.env.REACT_APP_APIBASE_URL);
    fetch(
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
        console.log(json[0]["enrollments"])
        // console.log(json);
        if (json[0]["enrollments"][0]["programID"] !== null) {
          // console.log(json[0]["enrollments"]);
          // this.setCourse(json[0]['enrollments'])
          loading = false;
          this.setState({ plist: json[0]["enrollments"]});
        }
      })
      .catch((error) => {
        console.log("error", error);
        loading = false ;
      });
  }

  // setCourse(progs){

  // }

  getCourses() {

      // program = document.getElementById("programs");
      // var programID = program.options[program.selectedIndex].value;
      var token = localStorage.getItem("token");
      var userID = localStorage.getItem("id");
      var program = document.getElementById("program");
      pid = program.options[program.selectedIndex].value;
      ptitle = program.options[program.selectedIndex].text;
      if(ptitle === "Select Program"){
        alert('select a valid program')
      }
      // programID = localStorage.getItem("program");
      // programID = this.props.match.params.programId
      console.log("pid =",pid,"ptitle =",ptitle);
      console.log(
        `course fetch api = ${process.env.REACT_APP_APIBASE_URL}/api/course/get/courseinfo/${userID}/${pid}/?token=${token}`
      );
      fetch(
        process.env.REACT_APP_APIBASE_URL +
          "/api/course/get/courseinfo/" +
          userID +
          "/" +
          pid +
          "/?token=" +
          token
      ).then((response) => response.text())
      .then((result) => {
          console.log(`course result = ${result}`);
          var json = JSON.parse(result);
          // json = json[0]['enrollments'];
          console.log("course data");
          console.log(json);

          if (json["courses"][0]["courseID"] !== null) {
              json["courses"] = json["courses"].filter((obj) => {
                return obj["courseInstances"][0]["isLive"] === true;
              });
              loading = false;
              this.setState({clist:json['courses'],cselect:pid})
          }
        })
        .catch((error) => {
          console.log("error", error)
      });
  }

  charts(){
    if(this.state.cselect === ""){

        var requestOptions = {
          method: 'POST',
          redirect: 'follow'
        };

        var PTitle = ptitle.replace(" ", "zzz");
        console.log("prog charts api =",`${process.env.REACT_APP_API_URL2}/program/activityscore/${PTitle}`)
        fetch(`${process.env.REACT_APP_API_URL2}/program/activityscore/${PTitle}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            result = JSON.parse(result);
            var images = result[0];
            
            var img_keys = ["pie","area","bar","scatter"];
            images = img_keys.map(img => {
              var value = images[img];
              value = `data:image/png;base64,${value}`;
              return <img className='flow-image' src={value} alt={img} />
            });

            var tables = result[1];
            var tab_keys = ["pietable","graphtable","bartable","scattertable"]
            tables = tab_keys.map(tab => {
              var value = tables[tab];
              return <div className="row" dangerouslySetInnerHTML={{ __html: value}}/>
            })
            ReactDOM.render(images,document.getElementById("Images"));
            ReactDOM.render(tables,document.getElementById("Tables"));
          
          })
          .catch(error => console.log('error', error));
    }else{
      var program = document.getElementById("course");
      cid = program.options[program.selectedIndex].value;
      ctitle = program.options[program.selectedIndex].text;
      document.getElementById("course").disabled = true;
    }
  }

  card(){
    loading = true; 
    var list = this.state.plist;
    list = list.filter((obj) => {
          return obj["programID"]["_id"] !== pid
        });

    console.log("list after program filter");
    console.log(list);
    list = list.map((program) => {
          return <option value={program["programID"]["_id"]} key={program["programID"]["_id"]}>{program["programID"]["programName"]}</option>
        });
    
    console.log("list after program map");
    console.log(list);

      if(this.state.cselect === ""){

        return (
        <div className="col">
        <div class="card-body position-relative">
        <div class="row gx-5">
        <div class="col-sm">
        <select id="program" class="form-select" aria-label={ptitle}>
        <option selected>{ptitle}</option>
        {list}
        </select>
        </div>
    <div class="col-sm">
    <button type="button" class="btn btn-primary" onClick={()=>{this.getCourses();}}>Select Course</button>
    </div>
    <div class="col-sm">
    <button type="button" class="btn btn-primary" onClick={() => this.charts()}>Enter</button>
    </div>
  </div>
      </div>
      </div>);
      }
      else if (this.state.cselect === pid){
        var clist = this.state.clist ;
        if(this.state.clist.length !== 0){
          clist = clist.map((program) => {
            return <option value={program["courseInstances"][0]["_id"]} key={program["courseInstances"][0]["_id"]}>{program["courseID"]["courseName"]}</option>
          });
        }else{
          clist = (<option>No active courses in this program</option>)
        }

        return (
          <div className="col">
          <div class="card-body position-relative">
          <div class="row gx-5">
          <div class="col-sm">
          <select id="program" class="form-select" aria-label={ptitle} disabled>
          <option selected>{ptitle}</option>
          {list}
          </select>
          </div>
          <div class="col-sm">
          <select id="course" class="form-select" aria-label="Select Course">
          <option selected>{ctitle}</option>
          {clist}
          </select>
          </div>
      <div class="col-sm">
      <button type="button" class="btn btn-primary" onClick={() => {this.setState({cselect: ""}); cid=""; ctitle=""; loading = false; }}>Back</button>
      </div>
      <div class="col-sm">
      <button type="button" class="btn btn-primary" onClick={() => this.charts()}>Enter</button>
      </div>
    </div>
        </div>
        </div>);
      }
  }

  render() {
    if(loading){
      return (<div className="container">
            <NavBar></NavBar></div>);
    }

    var card = this.card();
    return (<div className="container">
            <NavBar></NavBar>
            <div className="row">
            {card}
            </div>
    <div className="row">
    <div id="Images" className="col overflow"></div>
    <div id="Tables" className="col overflow"></div>
    </div>
  </div>);
  }
}

export default CourseStatus;
