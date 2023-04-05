import React from "react"
import { Link } from "react-router-dom"
import { User, UserAttribute } from "../model/Model"
import { AuthService } from "../services/AuthService"

interface ProfileState {
  userAttributes: UserAttribute[]
}

interface ProfileProps {
  user: User | undefined
  authService: AuthService
}
export class Profile extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    userAttributes: []
  }

  /*Called immediately after a component is mounted. Setting state here will trigger re-rendering. */
  async componentDidMount() {
    if (this.props.user) {
      const useratts = await this.props.authService.getUserAttributes(this.props.user)
      this.setState({
        userAttributes: useratts
      })
    }
  }
  private renderUserAttributes() {
    const rows = []
    for (const UserAttribute of this.state.userAttributes) {
      rows.push(
        <tr key={UserAttribute.name}>
          <td>{UserAttribute.name}</td>
          <td>{UserAttribute.value}</td>
        </tr>
      )
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    )
  }
  render(): React.ReactNode {
    let profileSpace
    if (this.props.user) {
      profileSpace = (
        <div>
          <h3>Hello {this.props.user.userName}</h3>
          Here are your attributes:
          {this.renderUserAttributes()}
        </div>
      )
    } else {
      profileSpace = (
        <div>
          please <Link to={"/login"}> Login</Link>
        </div>
      )
    }
    return (
      <div>
        welcome to the Profile page
        {profileSpace}
      </div>
    )
  }
}
