import React from "react"
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
      return <Wraper loading={this.state.loading} loadingHelper={this.loadingHelper} {...this.props} />
    }
  }
}
