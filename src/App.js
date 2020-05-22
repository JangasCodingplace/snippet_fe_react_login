import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialState } from './reducers/user';
import axios from 'axios';

/* IMPORT Actions */
import { authenticateUser } from './actions/authentication';
/* ./IMPORT Actions */

/* IMPORT Components */
import { getCookieValueByName } from './components/toolbox';
/* ./IMPORT Components */

/* IMPORT Components */
import PageWrapper from './components/PageWrapper/PageWrapper';
/* ./IMPORT Components */

/* Pages */
import Auth from './pages/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
/* ./Pages */

class App extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (this.props.user === initialState){
      const basic_url = 'http://127.0.0.1:8000/';
      const auth_url = basic_url + 'user/auth/login'

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookieValueByName('csrftoken')
        },
        withCredentials: true,
      };

      axios.post(auth_url, {}, config)
      .then((res) => {
        this.props.authenticateUser(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){
    if (this.props.user.auth_token===""){
      return (
        <PageWrapper>
          <Auth/>
        </PageWrapper>
      );
    }
    console.log(this.props.user)
    return (
      <PageWrapper>
        <Dashboard/>
      </PageWrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

let mapDispatchToProps = {
  authenticateUser:authenticateUser
}

let AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);


export default AppContainer;
