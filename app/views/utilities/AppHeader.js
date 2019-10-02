// @flow
import * as React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import classNames from "classnames"
// @material-ui/core components
import AlertDialog from "./../../components/alert/AlertDialog"
import PresenceDialog from "./../../components/dialog/PresenceDialog"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import DashboardIcon from "@material-ui/icons/Dashboard"
import order from "../../assets/img/order-full.svg"
import Svg from "react-inlinesvg"
import cookie from "react-cookies"
// other components
import { List, ListItem, ListItemIcon, ListItemText, SnackbarContent, Icon } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import * as types from "./../../stores/app/action-types"
import Divider from "@material-ui/core/Divider"
import { Menu, MenuItem } from "@material-ui/core"
//import AccountCircle from "@material-ui/icons/AccountCircle"
import Avatar from "@material-ui/core/Avatar"
import Snackbar from "@material-ui/core/Snackbar"
import CloseIcon from "@material-ui/icons/Close"
import { green, amber } from "@material-ui/core/colors"
import { havePermission } from "./../utilities/permission"
class AppHeader extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    flag: false,
    reason: "",
    state: false,
    id: "",
    loading: false,
    openDialog: false,
    userId: "",
    isValidReason: true,
    stateUser: false
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleDrawerOpen = () => {
    this.props.dispatch({
      type: types.TOOGLE_DRAWER_APP,
      status: true
    })
  }
  handleCloseNack = () => {
    this.props.dispatch({
      type: types.TOOGLE_SNACK,
      open: false
    })
  }
  handleDrawerClose = () => {
    if (this.props.app.openMenu) {
      this.props.dispatch({
        type: types.TOOGLE_DRAWER_APP,
        status: false
      })
    }
  }
  handleLogOut = () => {
    this.setState({ anchorEl: null }, () => {
      cookie.remove("accessToken", { path: "/" })
      cookie.remove("accessToken", { path: "/", domain: ".teko.vn" })
      cookie.remove("accessToken", { path: "/", domain: ".phongvu.vn" })
      cookie.remove("refreshToken", { path: "/" })
      cookie.remove("refreshToken", { path: "/", domain: ".teko.vn" })
      cookie.remove("refreshToken", { path: "/", domain: ".phongvu.vn" })
      cookie.remove("idToken", { path: "/" })
      cookie.remove("idToken", { path: "/", domain: ".teko.vn" })
      cookie.remove("idToken", { path: "/", domain: ".phongvu.vn" })
      window.location.reload()
    })
  }
  onAcceptRefresh = () => {
    window.location.reload()
  }
  switchState = (status, id) => {
    this.setState({
      openDialog: true,
      stateUser: status,
      userId: id
    })
  }
  onClose = () => {
    this.setState({
      openDialog: false,
      reason: "",
      isValidReason: true
    })
  }
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }
  checkUserInTeam(user) {
    let result = false
    if (user.team_ids && user.team_ids.length > 0) {
      result = true
    }
    return result
  }
  confirm = async () => {
    if (this.state.reason.trim() == "") {
      this.setState({ isValidReason: false })
      return
    }
    await this.setStateAsync({
      openDialog: false
    })
  }
  changeReason = value => {
    this.setState({
      reason: value
    })
  }
  renderMenuElement(key, user) {
    if (!user || (user && !user.permissions)) {
      return null
    }
    let element = menuMaping[key]
    let permission = element.perm
    let isRender = true
    if (permission) {
      isRender = havePermission(user, permission)
    }
    return isRender ? (
      <Link to={element.path}>
        <ListItem button className={this.props._key == key ? this.props.classes.activeLabel : this.props.classes.defaultLabel}>
          <ListItemIcon>
            <Svg
              className={this.props._key == key ? this.props.classes.activeIcon : this.props.classes.menuIcon}
              src={element.svgSrc}
              style={{ width: 30, height: 30 }}
            />
          </ListItemIcon>
          <ListItemText primary={element.title} />
        </ListItem>
      </Link>
    ) : null
  }
  render() {
    const { classes, user, app, title, _key } = this.props
    const { anchorEl, open } = this.state
    const openAnchor = Boolean(anchorEl)
    return (
      <React.Fragment>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          position="fixed"
        >
          <Toolbar className={classes.default} disableGutters={!open} style={{ paddingRight: 24 }}>
            {_key === "home" ? (
              <IconButton aria-label="Open drawer" className={classNames(classes.menuButton, open && classes.hide)} color="inherit"></IconButton>
            ) : (
              <IconButton
                aria-label="Open drawer"
                className={classNames(classes.menuButton, open && classes.hide)}
                color="inherit"
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography color="inherit" noWrap variant="h6">
              {title ? title : "Xử lý đơn hàng"}
            </Typography>
            <div className={classes.onlineState} />
            <div className={classes.onlineContainer}>
              <Typography style={{ fontSize: "1rem", fontWeight: 350 }}>Hi, {user.userDetail.first_name}</Typography>
              <IconButton aria-haspopup="true" aria-owns={open ? "menu-appbar" : undefined} color="inherit" onClick={this.handleMenu}>
                <Avatar alt="Profile Picture" src={user.userDetail.picture} style={{ border: "2px solid white" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                id="menu-appbar"
                onClose={this.handleClose}
                open={openAnchor}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <MenuItem>{user.userDetail.name}</MenuItem>
                <Divider />
                <MenuItem onClick={this.handleLogOut}>Thoát</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
          open={app.openMenu}
          onClose={this.handleDrawerClose}
        >
          <div role="presentation" onClose={this.handleDrawerClose}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to={"/home"}>
                <ListItem button className={_key == "home" ? classes.activeLabel : classes.defaultLabel}>
                  <ListItemIcon>
                    <DashboardIcon className={_key == "home" ? classes.activeIcon : classes.menuIcon} style={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary={"Trang chủ"} />
                </ListItem>
              </Link>
              {this.renderMenuElement("page1", user && user.userDetail ? user.userDetail : null)}
            </List>
          </div>
        </SwipeableDrawer>
        {app.visible && (
          <AlertDialog
            message={typeof app.message === "object" ? app.message.error : app.message}
            onAccept={this.closeDialog}
            title={app.statusError}
            visible
          />
        )}
        {app.visiblePresence && (
          <PresenceDialog
            message={"Bạn đã quá lâu chưa thao tác trên web. Vui lòng refresh(F5) lại trang web"}
            onAccept={this.onAcceptRefresh}
            title={"Thông báo"}
            visible
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={5000}
          onClose={this.handleCloseNack}
          open={app.snackOpen}
        >
          <SnackbarContent
            action={[
              <IconButton aria-label="Close" className={classes.close} color="inherit" key="close" onClick={this.handleCloseNack}>
                <CloseIcon />
              </IconButton>
            ]}
            aria-describedby="client-snackbar"
            className={classes[app.snackStatus]}
            message={
              <span className={classes.message} id="client-snackbar">
                <Icon className={classNames(classes.icon, classes.iconVariant)}>{mapingIcon[app.snackStatus]}</Icon>
                {app.snackContent}
              </span>
            }
            variant="success"
          />
        </Snackbar>
      </React.Fragment>
    )
  }
}
const menuMaping = {
  page1: {
    perm: null,
    path: "/page1",
    title: "Trang 1",
    svgSrc: order
  }
}
const mapingIcon = {
  success: "check_circle_icon",
  error: "error",
  info: "info",
  warning: "warning"
}
const drawerWidth = 280
const styles = theme => ({
  root: {
    display: "flex"
  },
  activeIcon: {
    color: "white",
    fill: "white !important"
  },
  defaultLabel: {
    color: "black"
  },
  activeLabel: {
    color: "white",
    backgroundColor: theme.palette.header,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.header
    }
  },
  menuIcon: { color: theme.palette.header, fill: theme.palette.header },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: 99
  },
  grow: {
    flexGrow: 1
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  default: {
    backgroundColor: "#1876d2"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {},
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  margin: {
    backgroundColor: green[600],
    margin: theme.spacing.unit
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  onlineState: {
    flexGrow: 1
  },
  onlineContainer: {
    display: "flex",
    alignItems: "center"
  },
  titleState: {
    marginRight: 12
  }
})
const mapStateToProps = state => {
  return {
    user: state.user,
    app: state.app
  }
}
//$FlowFixMe
export default withRouter(connect(mapStateToProps)(withStyles(styles)(AppHeader)))
