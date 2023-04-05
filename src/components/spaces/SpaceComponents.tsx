import React from "react"
import { User } from "../../model/Model"
import genImg from "../../assets/bgu.jpg"
import "./SpaceComponent.css"

interface SpaceComponentProps {
  spaceId: string
  name: string
  location: string
  photoUrl?: string
  reserveSpace: (spaceId: string) => void
}
export class SpaceComponent extends React.Component<SpaceComponentProps> {
  private renderImage() {
    if (this.props.photoUrl) {
      return <img src={this.props.photoUrl} alt="" />
    } else {
      return <img src={genImg} alt="" />
    }
  }
  render(): React.ReactNode {
    return (
      <div className="spaceComponent">
        {this.renderImage()}
        <br />
        <label className="name">{this.props.name}</label>
        <br />
        <label className="spaceId">{this.props.spaceId}</label>
        <br />
        <label className="location">{this.props.location}</label>
        <br />
        <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>
          reserve
        </button>
      </div>
    )
  }
}
