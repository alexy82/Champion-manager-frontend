import { Button } from "@material-ui/core"
import React from "react"
import BaseInfo from "./BaseInfo"
import { withStyles } from "@material-ui/core/styles"
import { Icon, CircularProgress } from "@material-ui/core"
import SetGroup from "./SetGroup"
import SetRole from "./SetRole"
import RoleInfo from "./RoleInfo"
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
class UserView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      loadingButton: false
    }
  }
  handleBack = () => {
    this.props.history.push("/user")
  }
  handleChangeError = (type, value) => {
    this.setState({ errors: { ...this.state.errors, [type]: { msg: value } } })
  }
  handleSave = async () => {
    if (!this.props.input.email) {
      this.handleChangeError("email", "Email không được để trống")
      return
    } else if (!this.props.input.fullname) {
      this.handleChangeError("fullname", "Tên người dùng không được để trống")
      return
    } else if (!this.props.input.mobile) {
      this.handleChangeError("phone", "Số điện thoại không được để trống")
      return
    } else if (!this.props.input.username) {
      this.handleChangeError("username", "Tên người dùng không được để trống")
      return
    }
    this.setState({ loadingButton: true }, async () => {
      await this.props.handleSave()
      this.setState({ loadingButton: false })
    })
  }
  handleChangeRole = async selected => {
    let permission = []
    let roleMixin = []
    selected.forEach(element => {
      roleMixin.push(this.props.roles.find(x => x.id == element))
    })
    roleMixin.map(item => {
      item.permissions.forEach(x => {
        permission.push(x.id + "")
      })
    })
    permission = permission.filter(onlyUnique)
    await this.props.handleChangeInputAsync("permission", permission)
    this.props.handleChangeInput("role", selected)
  }
  render() {
    const { classes, permissions, user, roles, input, handleChangeInput, isDisable } = this.props
    const { loadingButton } = this.state
    console.log(888888888888888888888888888, input, roles)
    return (
      <div>
        <BaseInfo roles={roles} isDisable={isDisable} input={input} errors={this.state.errors} handleChangeInput={handleChangeInput} />
        <div style={{ marginTop: 16 }}>{input.isAddToBaseInfo ? null : <RoleInfo role={user.permissions} />}</div>
        <div style={{ marginTop: 16 }}>
          <SetGroup
            disabled={isDisable}
            options={roles}
            selected={input.role}
            onChange={selected => {
              this.handleChangeRole(selected)
            }}
          />
          <SetRole
            disabled={isDisable}
            options={permissions}
            selected={input.permission}
            onChange={selected => handleChangeInput("permission", selected)}
          />
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
export default withStyles(style)(UserView)
