import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* IMPORT Actions */
import { authenticateUser } from '../../actions/authentication';
/* ./IMPORT Actions */

/* IMPORT Helper-Components */
import { validateEmail } from '../../components/toolbox';
/* ./IMPORT Helper-Components */

/* IMPORT UI-Components */
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formValues : {
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        agreed:false
      },
      formHelperTexts : {
        first_name:{helperText:"",error:false},
        last_name:{helperText:"",error:false},
        email:{helperText:"",error:false},
        password:{helperText:"",error:false},
        agreed:{helperText:"",error:false}
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

  handleChange = (e) => {
    let { formValues } = { ...this.state };
    formValues.agreed = e.target.checked;
    this.setState({ formValues:formValues });
  }

  registrateUser = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const registration_url = basic_url + 'user/auth/create_user';

    const body = JSON.stringify(this.state.formValues);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    axios.post(registration_url, body, config)
    .then((res) => {
      this.props.authenticateUser(res.data.user)
    })
    .catch((err) => {
      let { formHelperTexts } = { ...this.state };
      formHelperTexts.email = {
        helperText:'Email is already taken',
        error:true
      };
      this.setState({
        formHelperTexts:formHelperTexts
      });
    })
  }

  validateForm = () => {
    let { formHelperTexts,formValues,formIsValid } = { ...this.state };
    formHelperTexts = {
      first_name:{helperText:"",error:false},
      last_name:{helperText:"",error:false},
      email:{helperText:"",error:false},
      password:{helperText:"",error:false},
      agreed:{helperText:"",error:false}
    };
    formIsValid = true;
    if (formValues.first_name === ''){
      formHelperTexts.first_name = {
        helperText:'Please insert your first name.',
        error:true
      };
      formIsValid=false;
    }
    if (formValues.last_name === ''){
      formHelperTexts.last_name = {
        helperText:'Please insert your last name.',
        error:true
      };
      formIsValid=false;
    }
    if (formValues.email === '' || !validateEmail(formValues.email)){
      formHelperTexts.email = {
        helperText:'Please insert a valid email adress.',
        error:true
      };
      formIsValid=false;
    }
    if (formValues.password.length < 8){
      formHelperTexts.password = {
        helperText:'Please insert a password with minimum 8 letters.',
        error:true
      };
      formIsValid=false;
    }
    if (!formValues.agreed){
      formHelperTexts.agreed = {
        helperText:'For getting access you need to agree.',
        error:true
      };
      formIsValid=false;
    }

    if(formIsValid){
      this.registrateUser()
    }

    this.setState({
      formHelperTexts:formHelperTexts,
      formIsValid:formIsValid
    })
  }

  render(){
    var label = (
      <>Agree our <Link href="#">legals</Link></>
    )
    return(
      <form noValidate autoComplete="off">
        <Typography gutterBottom variant="h5" component="h2">
          Registration
        </Typography>
        <small>
          <span>or </span>
          <Link
            href="#"
            data-show="login"
            onClick={this.props.switchView}
          >
            Sign in
          </Link>
        </small>

        <TextField
          id="first_name"
          label="Firstname"
          variant="outlined"
          onChange={this.changeValue}
          fullWidth
          margin="normal"
          error={this.state.formHelperTexts.first_name.error}
          helperText={this.state.formHelperTexts.first_name.helperText}
        />


        <TextField
          id="last_name"
          label="Lastname"
          variant="outlined"
          onChange={this.changeValue}
          fullWidth
          margin="normal"
          error={this.state.formHelperTexts.last_name.error}
          helperText={this.state.formHelperTexts.last_name.helperText}
        />


        <TextField
          id="email"
          label="Email-Adress"
          variant="outlined"
          onChange={this.changeValue}
          fullWidth
          margin="normal"
          error={this.state.formHelperTexts.email.error}
          helperText={this.state.formHelperTexts.email.helperText}
        />


        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={this.changeValue}
          fullWidth
          margin="normal"
          error={this.state.formHelperTexts.password.error}
          helperText={this.state.formHelperTexts.password.helperText}
        />


        <FormControl margin="normal" required error={this.state.formHelperTexts.agreed.error}>
          <FormControlLabel
            control={
              <Checkbox
                id="agreed"
                color="primary"
                margin="normal"
                onChange={this.handleChange}
              />
            }
            label={label}
          />
          <FormHelperText>{this.state.formHelperTexts.agreed.helperText}</FormHelperText>
        </FormControl>


        <Button variant="contained" fullWidth color="primary" onClick={this.validateForm}>
          Crate your Account
        </Button>
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

let RegistrationContainer = connect(mapStateToProps,mapDispatchToProps)(Registration);

export default RegistrationContainer;
