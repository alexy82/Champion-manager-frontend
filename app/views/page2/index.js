import * as React from "react"
import { connect } from "react-redux"
import { Paper } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import * as typesApp from "./../../stores/app/action-types"
import MaterialTableDemo from "../../components/datalist/MaterialTableDemo"
class Roles extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  render() {
    let { classes } = this.props
    return (
      <div>
        <h2 className={classes.title}>Danh Sách Quyền</h2>
        <Paper className={classes.paperBox}>
          <MaterialTableDemo item xs={12} />
        </Paper>
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
export default connect()(withStyles(style)(Roles))
