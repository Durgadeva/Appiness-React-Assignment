
import { ErrorOutlineSharp } from '@material-ui/icons';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { Config } from '../config';

const { userLoginDetails, user } = Config;

export const LOGIN_PAGE_FEATURE_KEY = 'loginPage';

// Login Page Initial State
export const initialLoginPageState = {
    loginData: {},
    errorData: '',
    userDetails: [],
};

export const loginPageSlice = createSlice({
  name: LOGIN_PAGE_FEATURE_KEY,
  initialState: initialLoginPageState,
  reducers: {
    loginPageSuccess: (state, action) => {
      state.loginData = action.payload;
    },
    getUserDetailsSuccess: (state, action) => {
      state.userDetails = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorData = action.payload;
    }
  }
});

export const loginPageReducer = loginPageSlice.reducer;

export const {
  loginPageSuccess,
  getUserDetailsSuccess,
  setErrorMessage,
} = loginPageSlice.actions;

export function userLogin(data) {
  return (dispatch) => {
    try {
      if (userLoginDetails.username === data.email && userLoginDetails.password === data.password) {
        dispatch(loginPageSuccess('Successfully Logged In...'));
      } else {
        dispatch(setErrorMessage('Invalid credentials'))
      }
    } catch (err) {
      dispatch(setErrorMessage(ErrorOutlineSharp));
    }
  };
};

export function fetchUserDetails() {
  return (dispatch) => {
    try {
      let data = user;
      dispatch(getUserDetailsSuccess(data));
    } catch (err) {
      dispatch(setErrorMessage(err));
    }
  };
};

export const getLoginPageState = (rootState) =>
  rootState[LOGIN_PAGE_FEATURE_KEY];

export const selectLoginDetails = createSelector(
  getLoginPageState,
  (subState) => subState.loginData
);

export const selectUserDetails = createSelector(
  getLoginPageState,
  (subState) => subState.userDetails
);

export const selectErrorMessage = createSelector(
  getLoginPageState,
  (subState) => subState.errorData
);

