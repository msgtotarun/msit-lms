import React, {Component} from 'react';
import {Link,withRouter} from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import Cards from '../Cards/Cards'
import './credits.css';



class Credits extends Component{
    constructor(){
        super();
        this.state = {
            developers : [
                {Name: "Kalluru Rohit", Contact: "", Image: "" },
                {Name: "Mallika Bhargavi", Contact: "", Image: ""},
                {Name: "Radhika Patnala", Contact: "", Image: ""},
                {Name: "Tarun Kumar", Contact: "", Image: ""},
                {Name: "Muvvala Sravan Kumar", Contact: "", Image: ""}
            ]
        }

    }

    // setRows(list){
    //
    //   <div class="row">
    //   </div>
    // }

    setCards(list){
      list = list.map((dev) => {
        return <Cards name={dev.Name} image={dev.Image} contact={dev.Contact}></Cards>

      })

      // list = this.setRows(list)
      // var rows = [];
      // var display = [];
      // var i = 0;
      // list.forEach((card,ind,arr) => {
      //   if(ind+1 %3 == 1){
      //     rows = []
      //   }
      //   else if(i+1 %3 == 0){
      //      var doc = (<div className="row gx-5">{rows}</div>);
      //     display.push(doc);
      //   }
      //   rows.push(card)
      // })

      return list;
    }

    render()
    {
        var list = this.setCards(this.state.developers);

        return (<div class="container">
        <NavBar></NavBar>
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {list}
        </div>
        </div>)
    }
}

export default withRouter(Credits);
