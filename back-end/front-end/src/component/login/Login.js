import React, { Component } from "react";
import axios from "axios";
import Messages from "../Messages";
import Message from "../Message";
import Alert from "react-bootstrap/Alert";
import Cookies from "js-cookie";
import { signIn } from "../../api";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      show: false,
      loginSuccess: false,
    };
  }

  handelUserNameChange = (e) => {
    this.setState({ userName: e.target.value });
  };

  handelPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handelSingIn = (e) => {
    e.preventDefault();
    // get data from database by calling get method in fron-end
    signIn(this.state.userName, this.state.password)
      .then((response) => {
        // console.log(response);
        if (response.data) {
          console.log("Good job");
          Cookies.set("name", response.data, { expires: 1 });
          window.location.href = `/Messages`;
          // this.setState({ loginSuccess: true });
        } else {
          this.setState({
            show: true,
          });
        }
      })
      .catch((err) => {
        console.log("user name or password are incorrect");
      });
  };

  AlertDismissibleExample = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => this.setState({ ...this.state, show: false })}
        dismissible
      >
        <Alert.Heading>Something is wrong</Alert.Heading>
        <pre>User Name or Password are incorrect</pre>
      </Alert>
    );
  };

  render() {
    return (
      <div className="Login-main">
        {Cookies.get("name") ? (
          (window.location.href = `/Messages`)
        ) : this.state.show ? (
          <this.AlertDismissibleExample />
        ) : null}
        <form>
          <h3>Log in</h3>

          <div className="form-group">
            <label>User Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter user name"
              onChange={(e) => this.handelUserNameChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => this.handelPassword(e)}
              required
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            onClick={(e) => this.handelSingIn(e)}
          >
            Sign in
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    );
  }
}
