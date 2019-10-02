// @flow
import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import * as typesApp from "./../../stores/app/action-types"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Paper, Button, Grid } from "@material-ui/core"
import { GoogleLogin } from "react-google-login"
import cookie from "react-cookies"
import logoSquare from "../../assets/img/logo_square.png"
import { authToken, verifySystem } from "./../../stores/user/actions"
import { changeStateLogin } from "./../../stores/app/actions"
import * as config from "../../config/index"
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
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }
  responseGoogle = response => {
    console.log()
    if (response.code) {
      this.props.dispatch(authToken(response.code)).then(response => {
        if (response.access_token && response.refresh_token && response.id_token) {
          this.props.dispatch(verifySystem(response.id_token, response.email))
          cookie.save("accessToken", response.access_token, { path: "/" })
          cookie.save("refreshToken", response.refresh_token, { path: "/" })
          cookie.save("idToken", response.id_token, { path: "/" })
          this.props.dispatch(changeStateLogin(true))
          this.props.history.push("/home")
        }
      })
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: typesApp.TOOGLE_DRAWER_APP,
      status: false
    })
  }
  render() {
    let { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Grid alignItems="center" className={classes.loginWrapper} container justify="center">
          <Grid item md={3} sm={4} xs={8}>
            <Paper className={classes.paper}>
              <img src={logoSquare} style={{ height: "100%", width: "auto" }} />
              <GoogleLogin
                clientId={config.googleClientId}
                cookiePolicy={"single_host_origin"}
                onFailure={this.responseGoogle}
                responseType="code"
                prompt="consent"
                accessType="offline"
                onSuccess={this.responseGoogle}
                render={renderProps => (
                  <Button
                    className={classes.submit}
                    color="primary"
                    disabled={renderProps.disabled}
                    fullWidth
                    onClick={renderProps.onClick}
                    variant="contained"
                  >
                    Đăng nhập
                    <svg
                      style={{
                        width: "24px",
                        height: "24px",
                        marginLeft: "8px"
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </Button>
                )}
              />
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
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
  picker: {
    height: 32,
    borderLeft: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    borderRadius: "4px 0 0 4px",
    paddingLeft: 8,
    flex: 1
  },
  loginWrapper: {
    height: "100%",
    background: "#eeeeee"
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    margin: theme.spacing.unit
  },
  divider: {
    marginTop: "10px"
  },
  card: {
    color: "white",
    maxWidth: 345
  },
  processingCard: {
    maxWidth: 345,
    backgroundColor: "#cbb080",
    color: "white"
  },
  promotionCard: {
    backgroundColor: "#c2957d"
  },
  refundCard: {
    backgroundColor: "#3f8cb5",
    fontWeight: "bold"
  },
  groupUserCard: {
    backgroundColor: "#00b894"
  },
  debtCard: {
    backgroundColor: "#b5a33f"
  },
  media: {
    height: 140
  },
  labelInput: {
    color: "#52525b",
    display: "block",
    fontWeight: 600,
    paddingLeft: 2,
    paddingBottom: 2
  },
  icon: {
    width: 200,
    fontSize: "59px"
  },
  table: {
    border: "1px solid rgba(224, 224, 224, 1)"
  },
  total: {
    fontWeight: "bold"
  },
  paperBox: {
    marginTop: 30
  },
  titleBox: {
    textAlign: "center",
    color: "#f05050",
    fontWeight: 600
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: "#db4a39"
  }
})
export default withRouter(connect(mapStateToProps)(withStyles(style)(Login)))
