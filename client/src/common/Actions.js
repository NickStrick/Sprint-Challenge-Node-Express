import React, { Component } from 'react';


class Actions extends Component {

  render() { console.log(this.props.actions)
    return (
      <div >
        
        {this.props.actions.map(action => (
          <div>
            <h1>action : {action.description}</h1>
            <h3>project# : {action.project_id}</h3>
            <p>id# : {action.id}</p>    
          </div>
        ))}
      </div>
    );
  }
}

export default Actions;