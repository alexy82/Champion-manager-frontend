// @flow
import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import * as typesApp from "./../../stores/app/action-types"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"
import FeatureCard from "./FeatureCard"
import order from "../../assets/img/order.svg"
import { havePermission } from "./../utilities/permission"
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  renderFeatureCard(key, user) {
    if (!user || (user && !user.permissions)) {
      return null
    }
    let element = cardMaping[key]
    let permission = element.perm
    let isRender = true
    if (permission) {
      isRender = havePermission(user, permission)
    }
    return isRender ? (
      <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
        <Link to={element.path}>
          <FeatureCard {...element.props} />
        </Link>
      </Grid>
    ) : null
  }
  render() {
    let { classes, user } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.container}>
          <Grid container spacing={8} className={classes.containerBlock}>
            {this.renderFeatureCard("role", user && user.userDetail ? user.userDetail : null)}
          </Grid>
        </Paper>
      </MuiThemeProvider>
    )
  }
}
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontWeight: 400
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          display: "none"
        },
        "&:after": {
          display: "none"
        }
      }
    },
    MuiInputBase: {
      input: {
        border: "1px solid hsl(0,0%,80%)",
        height: 23,
        paddingLeft: 7,
        borderRadius: 4
      }
    },
    MuiFormControl: {
      root: {
        width: "90%"
      }
    }
  }
})
const cardMaping = {
  // invoice: {
  //   perm: permissions.search_invoice,
  //   path: "/invoice",
  //   props: {
  //     title: (
  //       <React.Fragment>
  //         {" "}
  //         ĐIỀU CHỈNH <br /> HÓA ĐƠN
  //       </React.Fragment>
  //     ),
  //     svgSource: box,
  //     content: "Thực hiện điều chỉnh thông tin đơn hàng.",
  //     style: { backgroundImage: "linear-gradient(to right, #3aade7, #1876d2)" }
  //   }
  // },
  role: {
    perm: "view_role",
    path: "/role",
    props: {
      title: (
        <React.Fragment>
          QUẢN LÝ
          <br />
          NHÓM QUYỀN
        </React.Fragment>
      ),
      svgSource: order,
      content: "Quản lý nhóm quyền",
      style: { backgroundImage: "linear-gradient(to right, #bd0fe7, #8806ca)" }
    }
  }
}
const mapStateToProps = state => {
  const { user } = state
  const { profile } = user
  return {
    currentStore: profile ? (profile.default_shop ? profile.default_shop : "") : ""
  }
}
const style = theme => ({
  container: {
    position: "absolute",
    top: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "#ececec",
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(3),
    textAlign: "-webkit-center"
  },
  containerBlock: {
    padding: "0 32px",
    width: "100%"
  },
  boxContainer: {},
  picture: {
    width: 150,
    height: 150,
    backgroundColor: "green",
    position: "relative",
    top: -36
  },
  row: {
    marginBottom: theme.spacing(10)
  },
  rowContaier: {
    alignItem: "center"
  },
  paperContainer: {
    maxHeight: 200,
    maxWidth: 400
  }
})
export default connect(mapStateToProps)(withStyles(style)(Home))
