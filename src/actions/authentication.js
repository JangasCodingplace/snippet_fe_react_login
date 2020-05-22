import axios from 'axios';

export function authenticateUser(user){
  return {
    type: "AUTHENTICATE_USER",
    user:user
  }
}

export function logout(){
  return {
    type: "LOGOUT"
  }
}
