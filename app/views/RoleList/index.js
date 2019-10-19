import { Button } from "@material-ui/core"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Icon, CircularProgress } from "@material-ui/core"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getAllRoleList, deleteRole } from "../../stores/role/actions"
import RoleTable from "./RoleTable"
import ConfirmDialog from "../../components/dialog/ConfirmDialog"
import { havePermission } from "../utilities/permission"
import { withLoadingPage } from "../Utils/loadingPage"
class RoleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      confirmDialog: false
    }
  }
  getList = async () => {
    await this.props.dispatch(getAllRoleList())
  }
  handleClose = () => {
    this.setState({
      confirmDialog: false
    })
  }
  confirmDialog = id => {
    this.setState({
      confirmDialog: true,
      id
    })
  }
  componentDidMount = this.props.loadingHelper(this.getList)()
  acceptDelete = this.props.loadingHelper(async () => {
    await this.props.dispatch(deleteRole(this.state.id))
    await this.getList()
  })
  render() {
    const { classes, role, user, loading } = this.props
    const { confirmDialog } = this.state
    return (
      <div>
        <h2 className={classes.title}> Danh sách quyền </h2>
        <RoleTable
          roles={role.data}
          isUpdate={havePermission(user, "update_role")}
          isDelete={havePermission(user, "delete_role")}
          confirmDialog={this.confirmDialog}
          rightBtn={
            havePermission(user, "create_role") ? (
              <Link to="/role-add">
                <Button variant="contained" color="primary" className={classes.button}>
                  Thêm
                  <Icon className={classes.rightIcon}>add</Icon>
                </Button>
              </Link>
            ) : null
          }
        />
        <ConfirmDialog
          visible={confirmDialog}
          title="Xác nhận"
          message="Bạn có chắc chắn muốn xóa ?"
          onAccept={this.acceptDelete}
          onClose={this.handleClose}
        />
        {loading ? (
          <div className={classes.overlay}>
            <CircularProgress size={30} className={classes.progress} />
          </div>
        ) : null}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    role: state.role,
    user: state.user.userDetail
  }
}
const style = () => ({
  title: {
    color: "#ff4a3c",
    fontSize: "24px",
    fontWeight: 700,
    margin: "30px",
    textAlign: "center",
    textTransform: "uppercase"
  },
  button: {
    float: "right",
    backgroundColor: "#10ac84"
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
export default connect(mapStateToProps)(withStyles(style)(withLoadingPage(RoleList)))
