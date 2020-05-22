import { combineReducers } from 'redux';

/* Import Reducers */
import { user } from './user';
/* ./Import Reducers */

let reduce = combineReducers({
  user:user
})

export default reduce;
