import React, { Component } from 'react';
import { connect } from 'react-redux';

/* IMPORT UI-Components */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
/* */


/* IMPORT Helper-Components */

/* */

class Navbar extends Component{
  constructor(props) {
    super(props);
  }
  getMenuTabs = () => {
    return (
      <>
        <Button color="inherit">Tab 1</Button>
        <Button color="inherit">Tab 2</Button>
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
  return {}
}

let mapDispatchToProps = {}

let NavbarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavbarContainer;
