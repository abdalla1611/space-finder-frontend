import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Navigate } from "react-router-dom";

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttenpted: boolean;
  loginSuccesfull: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttenpted: false,
    loginSuccesfull: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }
  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({ loginAttenpted: true });
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({ loginSuccesfull: true });
      this.props.setUser(result);
    } else {
      this.setState({ loginSuccesfull: false });
    }
  }
  render(): React.ReactNode {
    let loginMessage;
    if (this.state.loginAttenpted) {
      if (this.state.loginSuccesfull) {
        loginMessage = <label>Login Succesfull</label>;
      } else {
        loginMessage = <label>Login Faild</label>;
      }
    }
    return (
      <div className="login-box">
        {this.state.loginSuccesfull && <Navigate to={"/profile"} />}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="user-box">
            <input
              value={this.state.userName}
              onChange={(event) => this.setUserName(event)}
            />
            <label>Username</label>
          </div>
          <br />
          <div className="user-box">
            <input
              value={this.state.password}
              type="password"
              onChange={(event) => this.setPassword(event)}
            />
            <label>Password</label>
          </div>
          <br />
          <input type="submit" value={"login"} className="login"></input>
        </form>
        {loginMessage}
      </div>
    );
  }
}
