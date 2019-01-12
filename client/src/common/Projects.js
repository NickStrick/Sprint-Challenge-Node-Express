import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class Projects extends Component {

  render() { 
    return (
      <div>
        
        {this.props.projects.map(project => (
          <NavLink to ={`/projects/${project.id}`}>
            <h1>Project# : {project.id}</h1>
            <h3>name : {project.name}</h3>
            <p>description : {project.description}</p>
            
          </NavLink>
        ))}
      </div>
    );
  }
}

export default Projects;