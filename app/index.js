// @flow
import * as React from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { BrowserRouter } from "react-router-dom"
// Roboto font
// import "typeface-roboto"
// @material-ui/core style
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
// @material-ui-pickers
import { MuiPickersUtilsProvider } from "material-ui-pickers"
import MomentUtils from "@date-io/moment"
// Routes
import AppRoutes from "./routes/"
// Redux
import store from "./stores/configureStore"
import "react-dates/initialize"
import "./assets/scss/material-kit-react.css"
import "./assets/scss/split-pane.css"
import "react-dates/lib/css/_datepicker.css"
import "firebase/auth"
import "./assets/scss/app.css"
import "./assets/scss/styles.scss"
import "react-dual-listbox/lib/react-dual-listbox.css"
class Root extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // firebase.initializeApp(config.firebase_config);
  }
  render() {
    return (
      <BrowserRouter basename={"#"}>
        <AppRoutes />
      </BrowserRouter>
    )
  }
}
const RootWithState = connect()(Root)
const root = document.getElementById("root")
const theme = createMuiTheme({
  palette: {
    header: "#1876d2",
    page: "#629fda"
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontWeight: 400
  },
  overrides: {
    MuiTableRow: {
      root: {
        height: 32
      },
      head: {
        height: 40
      }
    }
  }
})
if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <RootWithState />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>,
    root
  )
}
export default Root
// registerServiceWorker();
