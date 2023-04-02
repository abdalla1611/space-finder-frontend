import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate /*instead of Switch */,
} from "react-router-dom";
import createBrowserHistory from "../utils/history";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Profile } from "./Profile";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  private auth: AuthService = new AuthService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User) {
    this.setState({ user: user });
  }

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <Router>
          <div>
            <Navbar user={this.state.user}></Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path={"/login"}
                element={
                  <Login authService={this.auth} setUser={this.setUser} />
                }
              />
              <Route path={"/profile"} element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}
