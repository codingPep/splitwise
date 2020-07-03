import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import "../assets/login.css";
import API from "../utils/serverApi";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isadmin: 0,
    };
  }
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = async () => {
    console.log(
      "THIS IS THE LOGIN AND PASSWORD====>",
      this.state.email,
      this.state.password
    );
    const email = this.state.email;
    const pass = this.state.password;
    // console.log("email==>", email, pass);
    if (email == "" || pass == "") {
      alert("Please fill up the field!");
    } else {
      const response = await axios.post(API.baseURL + "/user/signin", {
        email: this.state.email,
        password: this.state.password,
      });

      if (response.data == "Password Mismatch!") {
        this.setState({ email: "", password: "" });
        alert("Password Mismatch!");
      } else if (response.data == "Please Register!!!") {
        this.setState({ email: "", password: "" });

        alert("Please Register!");
      } else {
        console.log("I M HERE.....");
        console.log("response", response.data);
        // this.props.history.push("/main");
        this.props.history.push({
          pathname: "/main",

          state: { detail: response.data },
        });
      }
    }
  };
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const res = axios.post(API.baseURL + "/user/googlesignin", {
      email: response.profileObj.email,
    });
    // console.log("======google login response=======>", res);
    this.props.history.push("/main");
  };
  render() {
    return (
      <div className="signin">
        <div className="left">
          <h2 id="heading-top"> SPLITWISE LOGIN</h2>

          <div className="login-type1">
            <div className="google">
              <GoogleLogin
                clientId="743829497609-mlni2use4fv3l4os769o2hunnefh78ik.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="ortext">Or</div>

            <div className="one">
              <div className="two">
                <div className="two-one">
                  <div className="two-one-one">Email</div>
                  <div className="two-one-two">
                    <div className="two-one-two-one">
                      <input
                        className="two-input"
                        type="text"
                        onChange={(e) => this.handleEmailChange(e)}
                        value={this.state.email}
                      />
                    </div>
                    <div className="two-one-two-two">
                      <div className="two-underline"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="two">
                <div className="two-one">
                  <div className="two-one-one-password">Password</div>
                  <div className="two-one-two">
                    <div className="two-one-two-one">
                      <input
                        className="two-input"
                        type="password"
                        onChange={(e) => this.handlePasswordChange(e)}
                        value={this.state.password}
                      />
                    </div>
                    <div className="two-one-two-two">
                      <div className="two-underline"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="five">
                <button className="login" onClick={() => this.handleSubmit()}>
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="not-a-member">
            Not a Member?<Link to="/signup">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
