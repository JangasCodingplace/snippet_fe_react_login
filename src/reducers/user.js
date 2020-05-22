export const initialState = {
  email:'',
  first_name:'',
  last_name:'',
  auth_token:'',
}

export function user(state=initialState, action){
  if (action.type === "AUTHENTICATE_USER"){
    window.localStorage.setItem('auth_token', action.user.auth_token);
    return {
      email:action.user.email,
      first_name:action.user.first_name,
      last_name:action.user.last_name,
      auth_token:action.user.auth_token
    }
  }

  if (action.type === "LOGOUT"){
    window.localStorage.removeItem('auth_token');
    return initialState
  }

  if (action.type === "SAVE_USER"){
    return {
      email:action.user.email,
      first_name:action.user.first_name,
      last_name:action.user.last_name,
    }
  }

  return state;
}
