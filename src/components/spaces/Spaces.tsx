import React from "react"
import { Space } from "../../model/Model"
import { DataService } from "../../services/DataService"
import { SpaceComponent } from "./SpaceComponents"

interface SpacesState {
  spaces: Space[]
}

interface SpacesProps {
  dataService: DataService
}

export class Spaces extends React.Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props)
    this.state = {
      spaces: [],
    }
    this.reserveSpace = this.reserveSpace.bind(this)
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces()
    this.setState({
      spaces: spaces,
    })
  }

  private async reserveSpace(spaceId: string) {}

  private renderSpaces() {
    const rows: any[] = []
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          location={space.location}
          name={space.name}
          spaceId={space.spaceId}
          reserveSpace={this.reserveSpace}
        />
      )
    }
    return rows
  }

  render(): React.ReactNode {
    return (
      <div>
        <h2>Wellcome to the Spaces page</h2>
        {this.renderSpaces()}
      </div>
    )
  }
}
