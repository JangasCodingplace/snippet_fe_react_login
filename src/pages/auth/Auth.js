import React, { Component } from 'react';

import Login from './Login';
import Registration from './Registration';
import PasswordForgotten from './PasswordForgotten';

class Auth extends Component{
  constructor(props) {
    super(props);
    this.state = {
      display:'login',
    }
  }

  getForm = () => {
    if(this.state.display === 'registration'){
      return <Registration switchView={this.switchView}/>
    }
    if(this.state.display === 'passwordForgotten'){
      return <PasswordForgotten switchView={this.switchView} />
    }
    return <Login switchView={this.switchView}/>
  }

  switchView = (e) => {
    this.setState({
      display:e.target.attributes['data-show'].value
    });
  }

  render(){
    return(
      <>
        {this.getForm()}
      </>
    )
  }
}

export default Auth;
