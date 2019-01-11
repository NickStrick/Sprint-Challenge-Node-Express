import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


class Project extends Component {
    state = {
        project: {}
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/projects/${this.props.match.params.id}`)
            .then(response => {
            console.log(response)
            this.setState(() => ({project: response.data}));
            })
    
        
    }

  render() {
    return (
      <div >
        <h1>{this.state.project.name}</h1>
        <p>id# : {this.state.project.id}</p>
        <NavLink to='/projects'>Return</NavLink>
      </div>
    );
  }
}

export default Project;