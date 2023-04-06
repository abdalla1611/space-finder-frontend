import React from "react"
import "./ConfirmModalComp.css"
interface ConfirmModalCompProps {
  show: boolean
  content: string
  close: () => void
}

export class ConfirmModalComp extends React.Component<ConfirmModalCompProps> {
  render(): React.ReactNode {
    if (!this.props.show) return null

    return (
      <div className="modal">
        <div className="modal-content">
          <h2>You try to reserve and ....</h2>
          <h3>{this.props.content}</h3>
          <button onClick={() => this.props.close()}>close</button>
        </div>
      </div>
    )
  }
}
