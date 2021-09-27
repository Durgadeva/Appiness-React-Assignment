// React-Redux
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

// Lodash Lib
import { isEmpty } from "lodash-es";

// Material-UI
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// Actions
import {
  userLogin,
  selectLoginDetails,
  selectErrorMessage,
  setErrorMessage,
} from "../slices/app-slices";

// Styles
import "./login-page.scss";

// Config file
import { Config } from "../config";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ forceRefresh: true });

  // State variables initialization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [buttonName, setButtonName] = useState("Log In");

  // Fetch data from redux store
  const loginData = useSelector(selectLoginDetails);
  const errorData = useSelector(selectErrorMessage);

  useEffect(() => {
    if (!isEmpty(loginData)) {
      history.push(Config.DASHBOARD_URL);
    }
  }, [loginData]);

  const handleOnBlur = (event) => {
    event.preventDefault();
    const { id } = event.target;
    switch (id) {
      case "email":
        setEmail(event.target.value);
        if (isEmpty(email)) {
          setEmailError("Email id required");
        }
        if (!isEmpty(email) && !Config.pattern.email.test(email)) {
          setEmailError("Enter a valid email id");
        }
        break;
      case "password":
        setPassword(event.target.value);
        if (isEmpty(password)) {
          setPasswordError("Password required");
        }
        break;
    }
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    dispatch(setErrorMessage(""));
    const { id } = event.target;
    switch (id) {
      case "email":
        setEmail(event.target.value);
        setEmailError("");
        break;
      case "password":
        setPassword(event.target.value);
        setPasswordError("");
        break;
    }
  };

  const showHidePassword = () => {
    setPasswordHidden(!passwordHidden);
  };

  const handleLoginButtonClick = (event) => {
    event.preventDefault();
    if (!isEmpty(email) && !isEmpty(password)) {
      // Dispatching action for API calss
      dispatch(userLogin({ email, password }));
    }
  };

  return (
    <div className="login-page">
      <div className="left-side-content">
        <div className="logo"></div>
      </div>
      <div className="right-side-content">
        <div className="right-content-header">
          <p className="title">WELCOME !!!</p>
        </div>
        <div className="right-content-form">
          <form
            noValidate
            autoComplete="off"
            id="btnSubmit"
            data-testid="form"
            onSubmit={handleLoginButtonClick}
          >
            <div className="form-group">
            <FormControl>
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
                <TextField
                  error={!isEmpty(emailError)}
                  className="form-input"
                  placeholder="Eg: john@mail.com"
                  id="email"
                  variant="outlined"
                  onBlur={handleOnBlur}
                  onChange={handleOnChange}
                  defaultValue={email}
                  type="text"
                  helperText={!isEmpty(emailError) && emailError}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </div>
            <div className="form-group">
              <FormControl>
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <OutlinedInput
                  className="form-input"
                  error={!isEmpty(passwordError)}
                  id="password"
                  placeholder="&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;&nbsp;&#9679;"
                  type={passwordHidden ? "text" : "password"}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  defaultValue={password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={!isEmpty(password) ? showHidePassword : null}
                        edge="end"
                      >
                        {passwordHidden ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {!isEmpty(passwordError) && (
                <div className="error-text">{passwordError}</div>
              )}
              {!isEmpty(errorData) && (
                <div className="error-text">{errorData}</div>
              )}
            </div>
            <div>
              <Button
                variant="contained"
                className="submit-btn"
                color="primary"
                id="button"
                type="submit"
                size="large"
                fullWidth
              >
                {buttonName}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
