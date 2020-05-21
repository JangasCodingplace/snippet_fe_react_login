import React, { Component } from 'react';

/* IMPORT UI-Components */

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
            {this.props.children}
          </div>
        <Footer/>
      </>
    );
  }
}

export default PageWrapper;
