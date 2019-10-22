import React from "react"
import { connect } from "react-redux"
import { getAllPermission } from "./../../../stores/role/actions"
import { addUser } from "./../../../stores/user/actions"
import { withLoadingPage } from "./../../Utils/loadingPage"
import UserView from "./../UserView"
class UserAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {
        name: "",
        email: "",
        phone: ""
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
  handleSave = this.props.loadingHelper(async () => {
    await this.props.dispatch(addUser(this.state.input))
  })
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getPermission()
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
    user: state.user.userDetail
  }
}
export default connect(mapStateToProps)(withLoadingPage(UserAdd))
