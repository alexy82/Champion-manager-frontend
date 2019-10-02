import * as React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
function Transition(props) {
  return <Slide direction="up" {...props} />
}
const PresenceDialog = ({ title, message, onAccept, visible, onClose }) => (
  <Dialog
    aria-describedby="alert-dialog-slide-description"
    aria-labelledby="alert-dialog-slide-title"
    keepMounted
    onClose={onClose}
    open={visible}
    TransitionComponent={Transition}
  >
    <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onAccept}>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
)
export default PresenceDialog
