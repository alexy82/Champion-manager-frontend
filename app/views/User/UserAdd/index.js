import React from "react"
import { connect } from "react-redux"
import { getAllPermission } from "./../../../stores/role/actions"
import { getAllRoleList } from "./../../../stores/role/actions"
import { addUser } from "./../../../stores/user/actions"
import { withLoadingPage } from "./../../Utils/loadingPage"
import UserView from "./../UserView"
class UserAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {
        fullname: "",
        email: "",
        desc: "",
        mobile: "",
        role: [],
        permission: []
      },
      isEmptyInput: true
    }
  }
  getPermission = async () => {
    this.props.dispatch(getAllPermission())
  }
  getRoles = async () => {
    this.props.dispatch(getAllRoleList())
  }
  handleChangeInput = (type, value) => {
    this.setState({ input: { ...this.state.input, [type]: value } })
  }
  handleSave = this.props.loadingHelper(async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(this.state.input)
    await this.props.dispatch(addUser(this.state.input))
  })
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getPermission()
    await this.getRoles()
  })
  render() {
    return (
      <UserView
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
    roles: state.role.data,
    user: state.user.userDetail
  }
}
export default connect(mapStateToProps)(withLoadingPage(UserAdd))
