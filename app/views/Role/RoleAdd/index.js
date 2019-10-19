import React from "react"
import { connect } from "react-redux"
import { getAllPermission, addRole } from "./../../../stores/role/actions"
import RoleView from "./../RoleView"
import { withLoadingPage } from "./../../Utils/loadingPage"
class RoleAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {
        name: "",
        desc: "",
        permission: []
      },
      isEmptyInput: true
    }
  }
  getPermission = async () => {
    this.props.dispatch(getAllPermission())
  }
  handleChangeInput = (type, value) => {
    this.setState({ input: { ...this.state.input, [type]: value } })
  }
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getPermission()
  })
  handleSave = this.props.loadingHelper(async () => {
    await this.props.dispatch(addRole(this.state.input))
  })
  render() {
    return (
      <RoleView
        input={this.state.input}
        loadingButton={this.state.loadingButton}
        handleSave={this.handleSave}
        handleChangeInput={this.handleChangeInput}
        {...this.props}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    permissions: state.role.permission,
    user: state.user.userDetail
  }
}
export default connect(mapStateToProps)(withLoadingPage(RoleAdd))
