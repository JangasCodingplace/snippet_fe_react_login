import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* IMPORT Actions */
import { save_user } from '../../actions/user';
/* ./IMPORT Actions */

/* Components */
import { getCookieValueByName, validateEmail } from '../../components/toolbox';
/* ./Components */

/* IMPORT UI-Components */
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
/* */

class PersonalInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formValues:{
        first_name:this.props.user.first_name,
        last_name:this.props.user.last_name
      },
      formHelperTexts : {
        first_name:{helperText:"",error:false},
        last_name:{helperText:"",error:false}
      },
      formIsValid:false
    }
  }

  discardChanges = () => {
    document.getElementById('personalInfoForm').reset();
    let { formHelperTexts, formValues } = { ...this.state };
    formHelperTexts = {
      first_name:{helperText:"",error:false},
      last_name:{helperText:"",error:false}
    }
    formValues={
      first_name:this.props.user.first_name,
      last_name:this.props.user.last_name
    }
    this.setState({
      formValues:formValues,
      formHelperTexts:formHelperTexts
    })
  }

  saveChanges = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const save_url = basic_url + 'user/';

    const body = JSON.stringify(this.state.formValues);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookieValueByName('csrftoken')
      },
      withCredentials: true,
    };

    axios.put(save_url, body, config)
    .then((res) => {
      this.props.save_user(res.data.user);
    })
    .catch((err) => {

    })
  }

  validateChanges = () => {
    let { formHelperTexts, formValues, formIsValid } = { ...this.state };
    formHelperTexts = {
      first_name:{helperText:"",error:false},
      last_name:{helperText:"",error:false}
    }
    formIsValid = true;
    if (formValues.first_name === ""){
      formHelperTexts.first_name = {
        helperText:'Please insert your firstname (no empty field).',
        error:true
      };
      formIsValid = false;
    }
    if (formValues.last_name === ""){
      formHelperTexts.last_name = {
        helperText:'Please insert your lastname (no empty field).',
        error:true
      };
      formIsValid = false;
    }

    if (formIsValid){
      this.saveChanges();
    }
    this.setState({
      formHelperTexts:formHelperTexts,
      formIsValid:formIsValid
    })
  }

  handleChange = (e) => {
    let { formValues } = { ...this.state };
    formValues[e.target.id] = e.target.value;
    this.setState({
      formValues:formValues
    })
  }

  render(){
    return(
      <form id="personalInfoForm">
        <h1>Edit Personal Info</h1>
        <TextField
          id="first_name"
          label="Firstname"
          type="text"
          variant="outlined"
          margin="normal"
          onChange={this.handleChange}
          defaultValue={this.state.formValues.first_name}
          helperText={this.state.formHelperTexts.first_name.helperText}
          error={this.state.formHelperTexts.first_name.error}
          fullWidth
        />
        <TextField
          id="last_name"
          label="Lastname"
          type="text"
          variant="outlined"
          margin="normal"
          onChange={this.handleChange}
          defaultValue={this.state.formValues.last_name}
          helperText={this.state.formHelperTexts.last_name.helperText}
          error={this.state.formHelperTexts.last_name.error}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button onClick={this.discardChanges}>Discard</Button>
            <Button onClick={this.validateChanges}>Save</Button>
          </ButtonGroup>
        </Box>
      </form>
    );
  }
}

class LoginInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formValues:{
        email:this.props.user.email,
        new_password:"",
        confirm_new_password:"",
        current_password:""
      },
      formHelperTexts : {
        email:{helperText:"",error:false},
        new_password:{helperText:"",error:false},
        confirm_new_password:{helperText:"",error:false},
        current_password:{helperText:"",error:false}
      },
      formIsValid:false
    }
  }
  handleChange = (e) => {
    let { formValues } = { ...this.state };
    formValues[e.target.id] = e.target.value;
    this.setState({
      formValues:formValues
    })
  }
  discardChanges = () => {
    document.getElementById('loginDataChangeForm').reset();

    let { formHelperTexts, formValues } = { ...this.state };

    formValues = {
      email:this.props.user.email,
      new_password:"",
      confirm_new_password:"",
      current_password:""
    }

    formHelperTexts = {
      email:{helperText:"",error:false},
      new_password:{helperText:"",error:false},
      confirm_new_password:{helperText:"",error:false},
      current_password:{helperText:"",error:false}
    }
    this.setState({
      formValues:formValues,
      formHelperTexts:formHelperTexts
    });
  }
  saveChanges = () => {
    const basic_url = 'http://127.0.0.1:8000/';
    const save_url = basic_url + 'user/authdata_change';

    const body = JSON.stringify(this.state.formValues);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookieValueByName('csrftoken')
      },
      withCredentials: true,
    };

    axios.put(save_url, body, config)
    .then((res) => {
      this.props.save_user(res.data.user);
    })
    .catch((err) => {
      let { formHelperTexts } = { ...this.state };
      formHelperTexts.current_password = {
        helperText:"Wrong password",
        error:true
      }
      this.setState({
        formHelperTexts:formHelperTexts
      })
    })
  }
  validateChanges = () => {
    let { formHelperTexts, formValues, formIsValid } = { ...this.state };
    formHelperTexts = {
      email:{helperText:"",error:false},
      new_password:{helperText:"",error:false},
      confirm_new_password:{helperText:"",error:false},
      current_password:{helperText:"",error:false}
    }
    formIsValid = true;
    if (formValues.email === "" || !validateEmail(formValues.email)){
      formHelperTexts.email = {
        helperText:'Please insert a valid email-adress.',
        error:true
      };
      formIsValid = false;
    }
    if (formValues.new_password !== ""){
      if (formValues.new_password !== formValues.confirm_new_password){
        formHelperTexts.new_password = {
          helperText:'Your passwords dont match',
          error:true
        };
        formHelperTexts.confirm_new_password = {
          helperText:'Your passwords dont match',
          error:true
        };
        formIsValid = false;
      }
    }

    if (formValues.current_password === ""){
      formHelperTexts.current_password = {
        helperText:'Please enter your current password to confirm changes.',
        error:true
      };
      formIsValid = false;
    }

    if (formIsValid){
      this.saveChanges();
    }
    this.setState({
      formHelperTexts:formHelperTexts,
      formIsValid:formIsValid
    })
  }
  render(){
    return(
      <form id="loginDataChangeForm">
        <h1>Login Info</h1>
        <TextField
          id="email"
          label="Email-Adress"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
          defaultValue={this.state.formValues.email}
          error={this.state.formHelperTexts.email.error}
          helperText={this.state.formHelperTexts.email.helperText}
        />

        <TextField
          id="new_password"
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
          error={this.state.formHelperTexts.new_password.error}
          helperText={this.state.formHelperTexts.new_password.helperText}
        />

        <TextField
          id="confirm_new_password"
          label="Conform new password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
          error={this.state.formHelperTexts.confirm_new_password.error}
          helperText={this.state.formHelperTexts.confirm_new_password.helperText}
        />


        <TextField
          id="current_password"
          label="Conform Changes with current Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
          error={this.state.formHelperTexts.current_password.error}
          helperText={this.state.formHelperTexts.current_password.helperText}
        />

        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button onClick={this.discardChanges}>Discard</Button>
            <Button onClick={this.validateChanges}>Save</Button>
          </ButtonGroup>
        </Box>
      </form>
    );
  }
}

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
      display:'personalInfo',
    }
  }

  sideNav(){
    return(
      <MenuList>
       <MenuItem>
         <Typography
          variant="inherit"
          onClick={()=>{this.setState({display:'personalInfo'})}}
        >
          Personal Info
        </Typography>
       </MenuItem>
       <MenuItem>
         <Typography
          variant="inherit"
          onClick={()=>{this.setState({display:'loginInfo'})}}
        >
          Login Details
        </Typography>
       </MenuItem>
     </MenuList>
    )
  }

  getView(){
    let { display } = { ...this.state };
    if (display === 'loginInfo') return (
      <LoginInfo
        user={this.props.user}
        save_user={this.props.save_user}
      />
    );
    else return (
      <PersonalInfo
        user={this.props.user}
        save_user={this.props.save_user}
      />
    )
  }

  render(){
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {this.sideNav()}
        </Grid>
        <Grid item xs={9}>
          {this.getView()}
        </Grid>
      </Grid>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

let mapDispatchToProps = {
  save_user:save_user
}

let AccountContainer = connect(mapStateToProps,mapDispatchToProps)(Account);
export default AccountContainer;
