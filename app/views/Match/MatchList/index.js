import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ConfirmDialog from "./../../../components/dialog/ConfirmDialog"
// import { Link } from "react-router-dom"
// import { havePermission } from "./../../utilities/permission"
// import { Button, Icon } from "@material-ui/core"
class MatchList extends React.Component {
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
  render() {
    // const { classes, player } = this.props
    const { confirmDialog } = this.state
    return (
      <div style={{ marginBottom: 16 }}>
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
export default withStyles(style)(MatchList)
