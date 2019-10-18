import * as React from "react"
import { connect } from "react-redux"
import { Grid } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import * as typesApp from "./../../stores/app/action-types"
class OrderChecking extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  render() {
    let { classes } = this.props
    return (
      <Grid container justify="center">
        <h2 className={classes.title}>Trang test </h2>
        <br></br>
      </Grid>
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
  }
})
export default connect()(withStyles(style)(OrderChecking))
