import React, { Component } from 'react';

/* IMPORT UI-Components */
import Container from '@material-ui/core/Container';
/* */


/* IMPORT Helper-Components */

/* */

/* IMPORT Custom-Components */
import Navbar from './Navbar';
import Footer from './Footer';
/* */

class PageWrapper extends Component{
  render(){
    return (
      <>
        <Navbar/>
          <div style={{marginTop:20,minHeight:'80vh'}}>
            <Container maxWidth="md">
              {this.props.children}
            </Container>
          </div>
        <Footer/>
      </>
    );
  }
}

export default PageWrapper;
