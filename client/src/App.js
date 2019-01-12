import React, { Component } from 'react';

import './App.css';
import axios from "axios";
import { Route } from 'react-router-dom';


import Projects from './common/Projects.js';
import Project from './common/Project.js';
import Actions from './common/Actions.js';

class App extends Component {
  state = {
    projects: [],
    actions: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/projects')
    .then(response => {
      console.log(response)
      this.setState(() => ({projects: response.data}));
    })
    .catch(err => console.log(err));
    axios.get('http://localhost:5000/actions')
    .then(response => {
      this.setState(() => ({actions: response.data}));
    })
    .catch(err => console.log(err));


  }

  render() { console.log(this.state.projects)
    return (
      <div className="App">

        <Route exact path='/projects' render={props => (
          <Projects
          {...props}
          projects={this.state.projects}
          />
        )}
        />

        <Route path='/projects/:id' render={props => (
          <Project
          {...props}
          
          />
        )}
        />

        <Route path='/actions' render={props => (
          <Actions
          {...props}
          actions={this.state.actions}
          />
        )}
        /> 

      </div>
    );
  }
}

export default App;
