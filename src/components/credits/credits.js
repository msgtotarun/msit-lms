import React, {Component} from 'react'
import './credits.css';

class Credits extends Component{
    render()
    {
        return(
            <div className="col-sm d-flex flex-direction:column">
                <div className ="w-25 p-3 h-25 d-inline-block">
                    <div className="card" >
                        <b><h3 className="card-title">{this.props.title}</h3></b>
                        <img src={this.props.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <a href="#" className="card-link">{this.props.link1}</a>
                                <a href="#" className="card-link">{this.props.link2}</a>
                            </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.title}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Credits;