import React, { Component } from "react";
import ReactDOM from "react-dom";
import dompurify from "dompurify";
import './Quiz.css';

var questions = "";
var size = 0;
let qsize = 0;
var submit = true;
var contents = [];

class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    };
    // this.child = React.createRef();
    contents = JSON.parse(props.children);
    contents = contents[0]['questions'];
    qsize = contents.length;
    this.submission = this.submission.bind(this);
  }

  // async componentDidMount(){
  //   try{
  //   await this.setQuiz();
  //   }catch (err){
  //     // this.setState({loading: false})
  //     console.log(err)
  //   }
  // }

  async getSubmitted(){
    console.log(`selected for index ${size} question = `);
    console.log(contents[size])
    var qid = contents[size]['question_id'];
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    var correct,json;
    await fetch(`${process.env.REACT_APP_APIBASE_URL}/api/activityresponse/latest/${localStorage.getItem('id')}/${this.props.pid}/${this.props.cid}/${this.props.cin}/${this.props.mid}/${this.props.aid}/${qid}?token=${localStorage.getItem('token')}`, requestOptions)
      .then(async (response) => await response.text())
      .then(async (result) =>{
        console.log('result fetched in quiz api =',result);
        result = await JSON.parse(result);
        if(result['error'] !== undefined & result['error'] === 'not found'){
          correct = result['error'];
        }
        else if(result['result']!==null & result['result']!==undefined){
          correct = result['result'];
        }
        else{
          correct = result['error'];
        }
        json = result;
        (correct!==null | correct !== undefined)?correct = correct : correct = "";
        (json!==null | json !== undefined)?json = json : json = "";
        contents[size]['correct'] = correct;
        // contents[size] = Object.assign(contents[size],)
        contents[size]['result'] = json;
        if(size+1 === qsize){
          this.setState({loading: false});
          submit = false;
        }else{
          size = size + 1;
          this.setState({
            loading: true
          });
        }


      })
      .catch(error => console.log('error', error));

  }

  async setQuiz(){

    console.log('in quiz app contents = ')
    console.log(contents)
        var correct,json;
        var content = contents.map((con,qind,arr) =>{
          qind = qind+1;
          let question = `${qind}) `;
          con['questionText'].forEach((item,ind) => {
            (item['text'] === null | item['text'] === undefined)? 
            question = question + '<img src="'+`${item['image']['imageSRC']}`+'"></img>'
            :question = question + item['text']
          });
          var op = 0;
          console.log('question id = ',con['question_id']);
          correct = con['correct'];
          json = con['result'];
          console.log(`question id = ,${con['question_id']}, correct = ${correct}, json = ${json}`);

          let uniq = `QZ${qind}`;


          if(correct === true | correct === false){

            let options = json['response']['choices'].map((opt) => {
              op = op+1;
              let ouniq = `OPT${qind}${op}`;

                if(opt['selected'] === true){
                  return (<div key={ouniq} class="form-check">
                    <input className="form-check-input" type="checkbox" defaultChecked={true} QID={con['question_id']} data={opt['option']} value={opt['selected']} disabled></input>
                    <label className="form-check-label" for="flexCheckDefault">
                      {opt['option']}
                    </label>
                  </div>);
                }

                return (<div key={ouniq} class="form-check">
                <input className="form-check-input" type="checkbox" QID={con['question_id']} data={opt['option']} value={opt['selected']} disabled></input>
                <label className="form-check-label" for="flexCheckDefault">
                  {opt['option']}
                </label>
              </div>);

            });

            var correctText,correctClass;
            if(correct === true){
              correctText = "Correct";
              correctClass = "text-success text-center fw-bolder";
            }
            else{
              correctText = "Incorrect";
              correctClass = "text-danger text-center fw-bolder";
            }

                return (<div key={uniq} className="card border-primary mb-3 custom-card">
              <div
              className='card-header bg-transparent'
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(question),
              }}
            />
              <div className="card-body" id={"Q"+qind.toString()}>
                {options}
              </div>
              <div className="card-footer bg-transparent" id={"Sub"+qind.toString()}>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <p className="text-start">
                    Score: {json['awardedMarks']}
                    </p>
                  </div>
                  <div class="col">
                  <p className={correctClass}>{correctText}</p>
                  </div>
                  <div class="col">
                  <p className="text-end">submitted on {json['timestamp']}</p>
                  </div>
                </div>
              </div>
              
              </div>
              </div>);
          }

          let options = con['options'].map((opt) => {
            op = op+1;
            let ouniq = `OPT${size}${op}`;

            return (<div key={ouniq} class="form-check">
                <input className="form-check-input" type="checkbox" QID={con['question_id']} data={opt['option']} value={opt['correct']}></input>
                <label className="form-check-label" for="flexCheckDefault">
                  {opt['option']}
                </label>
              </div>);
          });

            return (<div key={uniq} className="card border-primary mb-3 custom-card">
            <div
            className='card-header bg-transparent'
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(question),
            }}
          />
            <div className="card-body position-relative" id={"Q"+qind.toString()}>
              {options}
            <button className="btn-primary custom-btn position-absolute bottom-0 end-0" id={`Btn${qind}`} type="button" onClick={() => {this.submission(qind.toString())}}>Submit</button>
            </div>
            <div className="card-footer bg-transparent" id={"Sub"+qind.toString()}></div>
            </div>);

        });


        
        console.log(content)

        questions = (<div class="col">
          {content}
        </div>);

        // if(reached === true){
          // this.setState({loading: false});
        // }



  }

  postToDB(options,correct){

    var qid = "";
    options = options.map((opt) => {

      qid = opt.getAttribute('qid')
      return {option: opt.getAttribute('data'),
              selected: opt.checked}
    });

    var response = {choices: options}

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      programId: this.props.pid,
      courseInstanceId: this.props.cin,
      courseId: this.props.cid,
      moduleId: this.props.mid,
      activityType: "quiz",
      activityId: this.props.aid,
      questionId: qid,
      response: response,
      result: correct,
      maxMarks: 1
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

  submission(ind){
    // ind = parseInt(ind);
      console.log('index selected =',ind);
      var question = document.getElementById('Q'+ind);
      var options = [...question.getElementsByTagName("INPUT")];
      var answers = [];
      console.log(options);
      options.forEach((element,ind,arr) => {
          if(element.value === true | element.value === "true"){
            answers.push(ind)
          }
          element.disabled = true;
      });

      var button = document.getElementById(`Btn${ind}`)
      button.className = "btn btn-secondary";
      button.disabled = true;

      var correct = true;
      var ans
      for(ans in answers){
          if(options[ans].checked !== "true" | options[ans].checked !== true){
            correct =  false;
            break;
          }
      }

      // answers = answers.filter(ans => {
      //     return (options[ans].checked === true | options[ans].checked === "true");
      // });

      var info = document.getElementById("Sub"+ind);
      if(correct === true){
        ReactDOM.render((<p className="text-success">Correct</p>),info);
      }else{
        ReactDOM.render((<p className="text-danger">Incorrect</p>),info);
      }

      this.postToDB(options,correct);

    // questions = document.getElementById('content').innerHTML;
    // console.log('question after getting inner html');
    // console.log(questions)
    // questions = (<div
    //   dangerouslySetInnerHTML={{
    //     __html: dompurify.sanitize(questions),
    //   }}
    // />);
    // console.log('question after getting html to jsx');
    // console.log(questions);
    // submit = true;
    // ReactDOM.render(questions,document.getElementById('questions'));
    // this.setState({loading: false});

  }

  render() {
    if(this.state.loading === true & submit === true){
      console.log('in render set quiz condition');
      this.getSubmitted();
      return (<div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>);
    }

    this.setQuiz();

    return (<div className="row" id="questions">{questions}
    </div>);
  }
}

export default Quiz;
