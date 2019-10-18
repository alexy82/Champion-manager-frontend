// @flow
import * as React from "react"
import logoSquare from "../../assets/img/403.png"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import Icon from "@material-ui/core/Icon"
// import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
class Page403 extends React.Component {
  static defaultProps = {
    message: "Không có quyền truy cập!",
    loading: false
  }
  render() {
    let { classes, message, title } = this.props
    return (
      <div className={classes.main}>
        <div className={classes.paper}>
          <div style={{ textAlign: "center" }}>
            <img src={logoSquare} style={{ height: "100%", width: "auto" }} />
          </div>
          <br />
          <Typography
            align={"center"}
            variant="h6"
            gutterBottom
            style={{ color: "#0d3e6b", textTransform: "uppercase", letterSpacing: "0.05rem", fontWeight: "400", width: "512px" }}
            noWrap
          >
            {title ? title : "Không thể truy cập"}
          </Typography>
          <Typography align={"center"} gutterBottom style={{ color: "#0d3e6b" }}>
            {message}
          </Typography>
          <div style={{ width: "200px", borderTop: "2px solid #0d3e6b", marginTop: 8, marginBottom: 16 }}></div>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/"
            }}
            className={classes.button}
          >
            <Icon className={classes.iconButton}>arrow_back</Icon>về trang chủ
          </Button>
        </div>
      </div>
    )
  }
}
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    textAlign: "center",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  button: {
    backgroundColor: "#0d3e6b",
    color: "white",
    "&:hover": {
      backgroundColor: "#0d3e6b",
      color: "white"
    }
  },
  iconButton: {
    marginRight: 8
  }
})
export default withStyles(styles)(Page403)
