import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Grid, Zoom, Dialog, DialogContent, CircularProgress, Icon } from "@material-ui/core"
function Transition(props) {
  return <Zoom {...props} />
}
class LoadingDialog extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, open, text, isError } = this.props
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent style={{ overflow: "hidden", padding: "20px 24px" }}>
          <Grid container alignItems="center" justifyContent="center">
            {isError ? <Icon className={classes.error}>close</Icon> : <CircularProgress className={classes.progress} />}
            <span className={classes.textLoading}>{text ? text : "Đang tải..."}</span>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}
const styles = theme => ({
  textLoading: {
    marginLeft: theme.spacing(2)
  },
  error: {
    fontSize: "2rem",
    color: "#da6262",
    fontWeight: "bolder"
  }
})
export default withStyles(styles)(LoadingDialog)
