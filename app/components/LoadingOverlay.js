// @flow
import React, { Component } from "react"
class LoadingOverlay extends Component {
  render() {
    const { children, ...rest } = this.props
    return (
      <div {...rest} style={{ ...rest.style, position: "relative" }}>
        {children}
      </div>
    )
  }
}
export default LoadingOverlay
