import React from "react"
import { CircularProgress } from "@material-ui/core"
const loadingStyle = {
  background: "white",
  opacity: 0.75,
  position: "absolute",
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}
export function withLoadingPage(Wraper) {
  // Create loading props that help display loading icon"
  // Change value of loading by loadingHelper func that is passed props to Wraper
  // Higher order component pattern
  return class cls extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false
      }
    }
    loadingHelper = action => {
      return (...params) => {
        this.setState({ loading: true }, async () => {
          await action(...params)
          this.setState({ loading: false })
        })
      }
    }
    render() {
      return (
        <React.Fragment>
          <Wraper loading={this.state.loading} loadingHelper={this.loadingHelper} {...this.props} />
          {this.state.loading ? (
            <div style={loadingStyle}>
              <CircularProgress size={30} />
            </div>
          ) : null}
        </React.Fragment>
      )
    }
  }
}
