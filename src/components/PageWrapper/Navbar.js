import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* IMPORT Actions */
import { logout } from '../../actions/authentication';
/* ./IMPORT Actions */

/* IMPORT Helper-Components */
import { getCookieValueByName } from '../../components/toolbox';
/* */


/* IMPORT UI-Components */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
/* */

class Navbar extends Component{
  constructor(props) {
    super(props);
  }
  logout = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const auth_url = basic_url + 'user/auth/logout'

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookieValueByName('csrftoken')
      },
      withCredentials: true,
    };

    axios.post(auth_url, {}, config)
    .then((res) => {
      this.props.logout()
    })
    .catch((err) => {

    })
  }

  getMenuTabs = () => {
    if (this.props.user.auth_token === '') return;
    return (
      <>
        <Button color="inherit" onClick={this.logout}>Logout</Button>
      </>
    )
  }
  render(){
    return (
      <div style={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography style={{flexGrow: 1}} variant="h6">
              Basic Template
            </Typography>
            {this.getMenuTabs()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

let mapDispatchToProps = {
  logout:logout
}

let NavbarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavbarContainer;
