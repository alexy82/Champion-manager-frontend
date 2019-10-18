// @flow
import * as React from "react"
import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import { verifyGoogleToken, verifySystem } from "./../../stores/user/actions"
import { toogleLoadingApp, changeStateLogin } from "./../../stores/app/actions"
import AppHeader from "./AppHeader"
import Page403 from "../403/"
import Login from "../Login/index"
import cookie from "react-cookies"
import * as config from "./../../config"
// import { havePermission, haveAsiaUser, haveAsia } from "./permission"
import communes from "../../constants/communes.json"
import districts from "../../constants/districts.json"
import provinces from "../../constants/provinces.json"
import { syncConstants } from "../../stores/constants/actions"
import { havePermission } from "./permission"
class AppRoute extends React.Component {
  async componentDidMount() {
    let idGoogle = cookie.load("accessToken")
    this.props.dispatch(toogleLoadingApp(true))
    if (idGoogle) {
      let response = await this.props.dispatch(verifyGoogleToken(idGoogle))
      if (!response || !response.data || !response.data.email) {
        this.props.dispatch(changeStateLogin(false))
      }
      this.props.dispatch(changeStateLogin(true))
      let idToken = cookie.load("idToken")
      this.props.dispatch(verifySystem(idToken, response.data.email))
    } else {
      this.props.dispatch(changeStateLogin(false))
    }
    this.props.dispatch(toogleLoadingApp(false))
    let data = {}
    data.provinces = provinces
    data.communes = communes
    data.districts = districts
    this.props.dispatch(syncConstants(data))
  }
  render() {
    const { component, title, background, classes, isLogin, app, user, _key, permission, ...rest } = this.props
    const C = component
    console.log(C)
    if (!isLogin) {
      return <Login />
    }
    if (!user.userDetail.id || app.loading) {
      return <CircularProgress className={classes.buttonProgress} />
    }
    if (permission && !havePermission(user.userDetail, permission)) {
      return (
        <Page403 loading={false} message={"Bạn không có quyền truy cập vào trang " + (title ? title.charAt(0).toLowerCase() + title.slice(1) : "")} />
      )
    }
    if (app.authError) {
      return <Page403 loading={false} message={app.authErrorMessage} />
    }
    return (
      <Route
        {...rest}
        render={props => (
          <div className={background ? classes.refund : classes.root}>
            <AppHeader title={title} _key={_key} />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <C {...rest} {...props} user={user} />
            </main>
            {config.env !== "production" ? <div className={classes.devEnv}>{config.env}</div> : null}
          </div>
        )}
      />
    )
  }
}
const styles = theme => ({
  root: {
    display: "flex"
  },
  refund: {
    display: "flex",
    backgroundColor: "#ececec",
    height: "100%"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  devEnv: {
    background: "rgba(155,0,0,.5)",
    width: 100,
    height: 100,
    position: "fixed",
    right: -50,
    bottom: -50,
    zIndex: 9000,
    transform: "rotate(-45deg)",
    boxSizing: "border-box",
    textShadow: "1px 1px 1px rgba(0,0,0,.5)",
    paddingTop: 10,
    color: "#fff",
    textAlign: "center"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  }
})
const mapStateToProps = state => {
  const { user } = state
  return {
    user,
    app: state.app,
    isLogin: state.app.isLogin
  }
}
// $FlowFixMe
export default withRouter(connect(mapStateToProps)(withStyles(styles)(AppRoute)))
