import React, { Component } from 'react';
import axios from 'axios';

/* IMPORT Helper-Components */
import { validateEmail } from '../../components/toolbox';
/* ./IMPORT Helper-Components */

/* IMPORT UI-Components */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
/* ./IMPORT UI-Components */

class PasswordForgotten extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formValues : {
        email:'',
      },
      formHelperTexts : {
        email:{helperText:"",error:false},
      },
      formIsValid:false
    }
  }

  changeValue = (e) => {
    let { formValues } = { ...this.state };
    formValues[e.target.id] = e.target.value;
    this.setState({
      formValues:formValues
    });
  }

  resetPassword = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const reset_url = basic_url + 'user/auth/reset_password';

    const body = JSON.stringify(this.state.formValues);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    axios.post(reset_url, body, config)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {

    })
  }

  validateForm = () => {
    let { formHelperTexts, formValues, formIsValid } = { ...this.state };
    formHelperTexts = {
      email:{helperText:"",error:false},
    };
    formIsValid = true;
    if (formValues.email === '' || !validateEmail(formValues.email)){
      formHelperTexts.email = {
        helperText:'Please insert a valid email adress.',
        error:true
      };
      formIsValid=false;
    }
    if (formIsValid){
      this.resetPassword()
    }
    this.setState({
      formHelperTexts:formHelperTexts,
      formIsValid:formIsValid
    })
  }

  getDisplayedForm = () => {
    let { formValues, formIsValid } = { ...this.state };
    console.log('FORM', formIsValid)
    if (!formIsValid){
      return(
        <form noValidate autoComplete="off">

          <Typography gutterBottom variant="h5" component="h2">
            Password forgotten
          </Typography>
          <small>
            <span>Please insert your Email. </span>
            <Link
              href="#"
              data-show="login"
              onClick={this.props.switchView}
            >
              Or go back.
            </Link>
          </small>


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


          <Button
            variant="contained"
            color="primary"
            onClick={this.validateForm}
            margin="normal"
            fullWidth
          >
            Send
          </Button>

        </form>
      )
    }
    return(
      <>
        <Typography gutterBottom variant="h5" component="h2">
          We have send you a reset Link to {formValues.email}
        </Typography>
        <small>
          <span>If you did not get an email click
            <Link
              href="#"
              onClick={this.resetPassword}
            >
              &nbsp;Here&nbsp;
            </Link>
             and we send it again.
          </span>
        </small>
      </>
    )

  }

  render(){
    return(
      <>{this.getDisplayedForm()}</>
    );
  }
}

export default PasswordForgotten;
