import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
/* */


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      anchorEl:null,
      navbarLinks:{
        profile:(
          <Link
            to="/profile"
            underline="none"
            color="inherit"
            component={RouterLink}
          >
            Edit Profile
          </Link>
        ),
      }
    }
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

  handleClick = (event) => {
    this.setState({
      anchorEl:event.currentTarget
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl:null
    })
  };


  getMenuTabs = () => {
    if (this.props.user.auth_token === '') return;
    let { anchorEl, navbarLinks } = { ...this.state };

    return (
      <>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          Profile
        </Button>
        <Menu
           id="customized-menu"
           anchorEl={anchorEl}
           keepMounted
           open={Boolean(anchorEl)}
           onClose={this.handleClose}
         >
           <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={navbarLinks.profile} onClick={this.handleClose}/>
           </MenuItem>
           <MenuItem onClick={this.logout}>
             <ListItemIcon>
               <ExitToAppIcon fontSize="small" />
             </ListItemIcon>
             <ListItemText primary="Logout" />
           </MenuItem>
         </Menu>
      </>
    )
  }
  render(){
    return (
      <div style={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography style={{flexGrow: 1}} variant="h6">
              <Link to="/" underline="none" color="inherit" component={RouterLink}>
                Basic Template
              </Link>
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
