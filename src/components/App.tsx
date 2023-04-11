import React from 'react'
import { User } from '../model/Model'
import { AuthService } from '../services/AuthService'
import { Login } from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import createBrowserHistory from "../utils/history"
import { Navbar } from './Navbar'
import { Home } from './Home'
import { Profile } from './Profile'
import { Spaces } from './spaces/Spaces'
import { DataService } from '../services/DataService'
import { CreateSpace } from './spaces/CreateSpace'
interface AppState {
  user: User | undefined
}

export class App extends React.Component<{}, AppState> {
  private auth: AuthService = new AuthService()
  private dataService: DataService = new DataService()
  constructor(props: any) {
    super(props)
    this.state = {
      user: undefined,
    }
    this.setUser = this.setUser.bind(this)
  }

  private async setUser(user: User) {
    this.setState({ user: user })
    await this.auth.GetAWSTemporaryCreds(user.cognitoUser)
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
                path={'/login'}
                element={<Login authService={this.auth} setUser={this.setUser} />}
              />
              <Route
                path={'/profile'}
                element={<Profile authService={this.auth} user={this.state.user} />}
              />
              <Route
                path={'/spaces'}
                element={<Spaces dataService={this.dataService} />}
              />
              <Route
                path={'/createSpace'}
                element={<CreateSpace dataService={this.dataService} />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    )
  }
}
