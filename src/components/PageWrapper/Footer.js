import React, { Component } from 'react';

/* IMPORT UI-Components */
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
/* */

class Footer extends Component{
  render(){
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="ä">
          Jangas Codingplace
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    );
  }
}

export default Footer;
