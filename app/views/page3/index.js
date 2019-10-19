import React from "react"
import { connect } from "react-redux"
import withStyles from "@material-ui/core/styles/withStyles"
import * as typesApp from "../../stores/app/action-types"
class AddData extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  render() {
    console.log("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999")
    return (
      <div>
        <p>t</p>
      </div>
    )
  }
}
const style = () => ({
  title: {
    color: "#da6262",
    fontSize: "24px",
    textAlign: "center",
    fontWeight: 700,
    textTransform: "uppercase",
    margin: "28px 0px 10px"
  },
  paperBox: {
    marginTop: 5
  },
  overlay: {
    background: "white",
    opacity: 0.75,
    position: "fixed",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})
export default connect()(withStyles(style)(AddData))
