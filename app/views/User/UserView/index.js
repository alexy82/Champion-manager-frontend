import { Button } from "@material-ui/core"
import React from "react"
import BaseInfo from "./BaseInfo"
import { withStyles } from "@material-ui/core/styles"
import { Icon, CircularProgress } from "@material-ui/core"
import SetGroup from "./SetGroup"
import SetRole from "./SetRole"
function onlyUnique(value, index, self) {
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
    if (!this.props.input.name) {
      this.handleChangeError("name", "Tên người dùng không được để trống")
      return
    } else {
      this.handleChangeError("name", "")
    }
    this.setState({ loadingButton: true }, async () => {
      await this.props.handleSave()
      this.setState({ loadingButton: false })
    })
  }
  handleChangeRole = selected => {
    let isRemove = selected.length < this.props.input.role.length
    let permission = this.props.input.permission
    let roleMixin = selected.concat(this.props.input.role)
    roleMixin = roleMixin.filter(onlyUnique)
    roleMixin.map(item => {
      let role = this.props.roles.find(element => {
        return element.id == item
      })
      console.log(role)
      role.permissions.map(perm => {
        if (isRemove) {
          var index = permission.indexOf(perm)
          permission.splice(index, 1)
        } else {
          permission.push("" + perm.id)
        }
      })
    })
    permission = permission.filter(onlyUnique)
    console.log(permission)
    this.props.handleChangeInput("permission", permission)
    this.props.handleChangeInput("role", selected)
  }
  render() {
    const { classes, permissions, roles, input, handleChangeInput, isDisable } = this.props
    console.log(input)
    const { loadingButton } = this.state
    return (
      <div>
        <BaseInfo isDisable={isDisable} input={input} errors={this.state.errors} handleChangeInput={handleChangeInput} />
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
