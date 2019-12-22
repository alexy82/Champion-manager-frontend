import React from "react"
import { withStyles } from "@material-ui/core/styles"
import PlayerTable from "./PlayerTable"
import { connect } from "react-redux"
import { getAllPlayerList } from "./../../../stores/player/actions"
import ConfirmDialog from "./../../../components/dialog/ConfirmDialog"
import { Link } from "react-router-dom"
import { havePermission } from "./../../utilities/permission"
import { Button, Icon } from "@material-ui/core"
import { withLoadingPage } from "./../../Utils/loadingPage"
class PlayerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      confirmDialog: false
    }
  }
  confirmDialog = id => {
    this.setState({
      confirmDialog: true,
      id
    })
  }
  getList = async () => {
    await this.props.dispatch(getAllPlayerList())
  }
  componentDidMount = this.props.loadingHelper(this.getList)()
  render() {
    const { classes, user, playerList } = this.props
    const { confirmDialog } = this.state
    return (
      <div style={{ marginBottom: 16 }}>
        <PlayerTable
          players={playerList}
          isUpdate={havePermission(user, "update_player")}
          isDelete={havePermission(user, "delete_player")}
          confirmDialog={this.confirmDialog}
          rightBtn={
            havePermission(user, "create_player") ? (
              <Link to="/player/add">
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
    playerList: state.player.data,
    player: state.player.playerDetail,
    user: state.user.userDetail
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
export default connect(mapStateToProps)(withStyles(style)(withLoadingPage(PlayerList)))
