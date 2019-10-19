import React from "react"
import { connect } from "react-redux"
import _, { cloneDeep } from "lodash"
import { getDetailRole, getAllPermission, editRole } from "./../../../stores/role/actions"
import RoleView from "./../RoleView"
import { withLoadingPage } from "./../../Utils/loadingPage"
import { havePermission } from "./../../utilities/permission"
class RoleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {},
      isEmptyInput: true
    }
  }
  getDetail = async () => {
    await this.props.dispatch(getDetailRole(this.props.match.params.id))
  }
  getPermission = async () => {
    this.props.dispatch(getAllPermission())
  }
  handleChangeInput = (type, value) => {
    this.setState({ input: { ...this.state.input, [type]: value } })
  }
  componentDidUpdate(prevProps) {
    if ((this.props.roleDetail.id && this.state.isEmptyInput) || !_.isEqual(prevProps.roleDetail, this.props.roleDetail)) {
      this.setState({ input: cloneDeep(this.props.roleDetail), isEmptyInput: false })
    }
  }
  handleSave = this.props.loadingHelper(async () => {
    await this.props.dispatch(editRole(this.state.input))
  })
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getPermission()
    await this.getDetail()
  })
  render() {
    return (
      <RoleView
        input={this.state.input}
        errors={this.state.errors}
        loadingButton={this.state.loadingButton}
        handleSave={this.handleSave}
        handleChangeInput={this.handleChangeInput}
        isDisable={!havePermission(this.props.user, "update_role")}
        {...this.props}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    roleDetail: state.role.detailRole,
    permissions: state.role.permission,
    user: state.user.userDetail
  }
}
export default connect(mapStateToProps)(withLoadingPage(RoleDetail))
