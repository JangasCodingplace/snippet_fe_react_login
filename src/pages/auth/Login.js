import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* IMPORT Actions */
import { authenticateUser } from '../../actions/authentication';
/* ./IMPORT Actions */

/* IMPORT Components */
import { getCookieValueByName } from '../../components/toolbox';
/* ./IMPORT Components */

/* IMPORT UI-Components */
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
/* ./IMPORT UI-Components */

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formValues : {
        email:'',
        password:''
      },
      formHelperTexts : {
        email:{helperText:"",error:false},
        password:{helperText:"",error:false},
      },
      formIsValid:true,
      invalidMailOrPassword:false
    }
  }

  changeValue = (e) => {
    let { formValues } = { ...this.state };
    formValues[e.target.id] = e.target.value;
    this.setState({
      formValues:formValues
    });
  }

  authentication = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const auth_url = basic_url + 'user/auth/login';

    const body = JSON.stringify(this.state.formValues);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookieValueByName('csrftoken')
      },
      withCredentials: true,
    };

    axios.post(auth_url, body, config)
    .then((res) => {
      this.props.authenticateUser(res.data.user)
    })
    .catch((err) => {
      this.setState({
        invalidMailOrPassword:true
      })
    })
  }

  validateForm = () => {
    let { formHelperTexts,formValues,formIsValid } = { ...this.state };
    formHelperTexts = {
      email:{helperText:"",error:false},
      password:{helperText:"",error:false}
    };
    formIsValid=true

    if (formValues.email === ''){
      formHelperTexts.email = {
        helperText:'Please insert a valid email adress.',
        error:true
      };
      formIsValid=false;
    }
    if (formValues.password === ''){
      formHelperTexts.password = {
        helperText:'Please insert a password.',
        error:true
      };
      formIsValid=false;
    }
    if (formIsValid){
      this.authentication();
    }

    this.setState({
      formHelperTexts:formHelperTexts
    })
  }

  getErrorMessage = () => {
    if (!this.state.invalidMailOrPassword) return;
    return (
      <Typography color="error">Invalid Mail or Password.</Typography>
    )
  }


  render(){
    return(
      <form noValidate autoComplete="off">
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
        <small>
          <span>or </span>
          <Link
            href="#"
            data-show="registration"
            onClick={this.props.switchView}
          >
            create an Account
          </Link>
        </small>

        {this.getErrorMessage()}


        <TextField
          id="email"
          label="Email-Adress"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.changeValue}
          error={this.state.formHelperTexts.email.error}
          helperText={this.state.formHelperTexts.email.helperText}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.changeValue}
          error={this.state.formHelperTexts.password.error}
          helperText={this.state.formHelperTexts.password.helperText}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={this.validateForm}
          margin="normal"
          fullWidth
        >
          Login
        </Button>
        <Grid container>
          <small>
            <Link
              href="#"
              data-show="passwordForgotten"
              onClick={this.props.switchView}
            >
              Password forgotten?
            </Link>
          </small>
        </Grid>

      </form>
    );
  }



}

let mapStateToProps = (state) => {
  return {

  }
}

let mapDispatchToProps = {
  authenticateUser:authenticateUser
}

let LoginContainer = connect(mapStateToProps,mapDispatchToProps)(Login);


export default LoginContainer;
