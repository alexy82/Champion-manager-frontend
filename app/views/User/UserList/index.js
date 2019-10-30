import React from "react"
import { connect } from "react-redux"
import { Button, Icon } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { withLoadingPage } from "./../../Utils/loadingPage"
import { getAllUserList, deleteUser } from "./../../../stores/user/actions"
import { havePermission } from "./../../utilities/permission"
import ConfirmDialog from "./../../../components/dialog/ConfirmDialog"
import { Link } from "react-router-dom"
import UserTable from "./UserTable"
class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      confirmDialog: false
    }
  }
  getList = async () => {
    await this.props.dispatch(getAllUserList())
  }
  confirmDialog = id => {
    this.setState({
      confirmDialog: true,
      id
    })
  }
  acceptDelete = this.props.loadingHelper(async () => {
    this.handleClose()
    await this.props.dispatch(deleteUser(this.state.id))
    await this.getList()
  })
  handleClose = () => {
    this.setState({
      confirmDialog: false
    })
  }
  componentDidMount = this.props.loadingHelper(this.getList)()
  render() {
    const { classes, user, userList } = this.props
    const { confirmDialog } = this.state
    return (
      <div>
        <UserTable
          users={userList}
          isUpdate={havePermission(user, "update_role")}
          isDelete={havePermission(user, "delete_role")}
          confirmDialog={this.confirmDialog}
          rightBtn={
            havePermission(user, "create_user") ? (
              <Link to="/user/add">
                <Button variant="contained" style={{ backgroundColor: "#ffd014" }} className={classes.button}>
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
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    userList: state.user.data,
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
export default connect(mapStateToProps)(withStyles(style)(withLoadingPage(UserList)))
