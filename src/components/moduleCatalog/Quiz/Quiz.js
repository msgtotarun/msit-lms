import React, { Component } from "react";
import ReactDOM from "react-dom";
import './Quiz.css';

var contents = "";
var size = 0;
class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      submit: false
    };
  }

  setQuiz(){
    contents = JSON.parse(this.props.children);
    contents = contents[0];
    size = 0;

    console.log('in quiz app contents = ')
    console.log(contents)

        var content = contents['questions'].map(con =>{
          size = size + 1;
          let question = `${size}) ${con['questionText'][0]['text']}`;
          var op = 0;
          let options = con['options'].map(opt => {
                op = op+1;
                let ouniq = `OPT${size}${op}`;
                return (<div key={ouniq} class="form-check">
                <input className="form-check-input" type="checkbox" value={opt['correct']}></input>
                <label className="form-check-label" for="flexCheckDefault">
                  {opt['option']}
                </label>
              </div>);
          });
          let uniq = `QZ${size}`;
          return (<div key={uniq} className="card border-primary mb-3 custom-card">
          <div className="card-header bg-transparent border-success">{question}</div>
          <div classNAme="card-body" id={"Q"+size.toString()}>
            {options}
          </div>
          <div className="card-footer bg-transparent border-success" id={"Sub"+size.toString()}></div>
          </div>);

        });

        return (<div class="col">
          {content}
          <button className="btn-primary custom-btn" type="button" onClick={this.submission}>Submit</button>
        </div>);



  }

  submission(){
    for(var i=1;i<=size; i = i+1){
      var question = document.getElementById(`Q${i}`);
      var options = [...question.getElementsByTagName("INPUT")];
      var answers = [];
      console.log(options);
      options.forEach((element,ind,arr) => {
          if(element.value === true | element.value === "true"){
            answers.push(ind)
          }
          element.disabled = true;
      });

      var correct = answers.length;

      answers = answers.filter(ans => {
          return (options[ans].checked === true | options[ans].checked === "true");
      });

      var info = document.getElementById(`Sub${i}`);
      if(answers.length === correct){
        ReactDOM.render((<p className="text-success">Correct</p>),info);
      }else{
        ReactDOM.render((<p className="text-danger">Incorrect</p>),info);
      }

    }
  }

  render() {
    var questions = this.setQuiz();

    return (<div className="row">{questions}
    </div>);
  }
}

export default Quiz;
