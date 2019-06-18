import { combineReducers } from "redux";

import nav from './navReducer';
import auth from './authReducer';
import app from './appReducer';

const AppReducer = combineReducers({
  nav,
  auth,
  app
});

export default AppReducer;
