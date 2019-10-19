import React from "react"
import Icon from "@material-ui/core/Icon"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import { toogleLoadingApp } from "../stores/app/actions"
import * as typesApp from "../stores/app/action-types"
class AddButton extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  render() {
    let { classes } = this.props
    return (
      <Button variant="contained" color="primary" className={classes.button} endIcon={<Icon>add</Icon>} onclick={show}>
        Thêm
      </Button>
    )
  }
}
const show = () => {
  return toogleLoadingApp(import("../views/page3"))
}
const style = theme => ({
  button: {
    float: "right",
    overflow: "auto",
    margin: theme.spacing(1)
  }
})
export default connect()(withStyles(style)(AddButton))
