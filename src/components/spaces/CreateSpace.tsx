import React, { SyntheticEvent } from 'react'
import { DataService } from '../../services/DataService'

interface CustomEvent {
  target: HTMLInputElement
}
export interface ICreateSpaceState {
  name?: string
  location?: string
  description?: string
  photoURL?: string
  photo?: File
}

interface ICreateSpaceProps {
  dataService: DataService
}

export class CreateSpace extends React.Component<ICreateSpaceProps, ICreateSpaceState> {
  state: ICreateSpaceState = {}

  private setName(event: CustomEvent) {
    this.setState({ name: event.target.value })
  }
  private setLocation(event: CustomEvent) {
    this.setState({ location: event.target.value })
  }
  private setDescription(event: CustomEvent) {
    this.setState({ description: event.target.value })
  }
  private setPhotoURL(event: CustomEvent) {
    if (event.target.files && event.target.files[0])
      this.setState({ photo: event.target.files[0] })
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    const cloneState = { ...this.state }
    try {
      const id = await this.props.dataService.createSpace(cloneState)
      alert(`space with id ${id} is created !`)
    } catch (error) {
      alert(`Error while createing space: ${error.message}`)
    }
  }

  render(): React.ReactNode {
    let photo
    if (this.state.photo) {
      const localPhotoURL = URL.createObjectURL(this.state.photo)
      photo = <img src={localPhotoURL} alt="" />
    } else {
      photo = <div></div>
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Name: <br />
          <input
            type="text"
            name="space-name"
            value={this.state.name}
            onChange={(e) => this.setName(e)}
          />
        </label>
        <br />
        <label>
          Location:
          <br />
          <input
            type="text"
            name="space-location"
            value={this.state.location}
            onChange={(e) => this.setLocation(e)}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            type="text"
            name="space-description"
            value={this.state.description}
            onChange={(e) => this.setDescription(e)}
          />
        </label>
        <br />
        <label>
          Photo:
          <br />
          <input type="file" name="space-photo" onChange={(e) => this.setPhotoURL(e)} />
        </label>
        <br />
        {photo} <br />
        <input data-test="submit-button" type="submit" value="Create Space" />
      </form>
    )
  }
}
