import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
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
      <div>
        <h2>Please Login</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            value={this.state.userName}
            onChange={(event) => this.setUserName(event)}
          />
          <br />
          <input
            value={this.state.password}
            type="password"
            onChange={(event) => this.setPassword(event)}
          />
          <br />
          <input type="submit" value="login" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
