import { Button } from "@material-ui/core"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Icon, CircularProgress } from "@material-ui/core"
import BaseInfo from "./BaseInfo"
import DualListBox from "./DualBoxSelect"
class RoleView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      loadingButton: false
    }
  }
  handleBack = () => {
    this.props.history.push("/role")
  }
  handleChangeError = (type, value) => {
    this.setState({ errors: { ...this.state.errors, [type]: { msg: value } } })
  }
  handleSave = async () => {
    if (!this.props.input.name) {
      this.handleChangeError("name", "Tên quyền không được để trống")
      return
    } else {
      this.handleChangeError("name", "")
    }
    this.setState({ loadingButton: true }, async () => {
      await this.props.handleSave()
      this.setState({ loadingButton: false })
    })
  }
  render() {
    const { classes, loading, permissions, input, handleChangeInput, isDisable } = this.props
    const { loadingButton } = this.state
    return (
      <div>
        <BaseInfo isDisable={isDisable} input={input} errors={this.state.errors} handleChangeInput={handleChangeInput} />
        <div style={{ marginTop: 16 }}>
          <DualListBox options={permissions} selected={input.permission} onChange={selected => handleChangeInput("permission", selected)} />
        </div>
        <div className={classes.buttonContainer}>
          <Button style={{ marginRight: 10, backgroundColor: "#808080" }} onClick={this.handleBack} variant="contained" className={classes.button}>
            Quay lại
          </Button>
          <Button
            disabled={loadingButton}
            onClick={this.handleSave}
            style={{ position: "relative", marginRight: 8, backgroundColor: "#ffd014" }}
            variant="contained"
            className={classes.button}
          >
            <Icon className={classes.leftIcon}>save</Icon>
            Lưu
            {loadingButton && <CircularProgress size={24} />}
          </Button>
        </div>
        {loading ? (
          <div className={classes.overlay}>
            <CircularProgress size={30} className={classes.progress} />
          </div>
        ) : null}
      </div>
    )
  }
}
const style = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  buttonContainer: {
    marginTop: 35,
    textAlign: "center",
    position: "relative"
  },
  button: {
    float: "right",
    backgroundColor: "#10ac84",
    color: "white"
  },
  overlay: {
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
})
export default withStyles(style)(RoleView)
