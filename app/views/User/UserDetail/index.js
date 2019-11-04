import React from "react"
import { connect } from "react-redux"
import _, { cloneDeep } from "lodash"
import { userDetail, editUser } from "../../../stores/user/actions"
import { getAllPermission, getAllRoleList } from "../../../stores/role/actions"
import UserView from "./../UserView"
import { withLoadingPage } from "../../Utils/loadingPage"
import { havePermission } from "../../utilities/permission"
class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {
        fullname: "",
        email: "",
        mobile: "",
        roles: [],
        permissions: []
      },
      isEmptyInput: true
    }
  }
  getDetail = async () => {
    await this.props.dispatch(userDetail(this.props.match.params.id))
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
  componentDidUpdate(prevProps) {
    if ((this.props.user.id && this.state.isEmptyInput) || !_.isEqual(prevProps.user, this.props.user)) {
      this.setState({ input: cloneDeep(this.props.user), isEmptyInput: false })
    }
  }
  handleSave = this.props.loadingHelper(async () => {
    await this.props.dispatch(editUser(this.state.input))
  })
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getDetail()
    await this.getPermission()
    await this.getRoles()
  })
  render() {
    return (
      <UserView
        input={this.state.input}
        errors={this.state.errors}
        loadingButton={this.state.loadingButton}
        handleSave={this.handleSave}
        handleChangeInput={this.handleChangeInput}
        isDisable={!havePermission(this.props.user, "update_user")}
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
export default connect(mapStateToProps)(withLoadingPage(UserDetail))
