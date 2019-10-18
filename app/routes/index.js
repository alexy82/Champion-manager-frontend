// @flow
import * as React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import AppRoute from "../views/utilities/AppRoute"
import Loadable from "react-loadable"
import Home from "../views/Home"
import CircularProgress from "@material-ui/core/CircularProgress"
// import { permissions } from "./../utils/constant"
const styleProgress = {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12
}
const LoadablePage1 = Loadable({
  loader: () => import("../views/page1"),
  loading() {
    return (
      <div>
        <CircularProgress style={styleProgress} />
      </div>
    )
  }
})
const LoadablePage2 = Loadable({
  loader: () => import("../views/page2"),
  loading() {
    return (
      <div>
        <CircularProgress style={styleProgress} />
      </div>
    )
  }
})
const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <AppRoute component={Home} exact background needAuthenticated needStore path="/home" title={"Trang chủ"} _key={"home"} />
      {/* {/* <AppRoute
        component={LoadableSearchInvoice}
        permission={permissions.search_invoice}
        exact
        needAuthenticated
        needStore
        path="/invoice"
        _key={"invoice"}
        title={"Điều chỉnh hóa đơn"}
      /> */}
      <AppRoute component={LoadablePage1} exact needAuthenticated needStore background path="/page1" _key={"page1"} title={"Trang 1"} />
      <AppRoute component={LoadablePage2} exact needAuthenticated needStore background path="/page2" _key={"page2"} title={"Quản lý nhóm quyền"} />
    </Switch>
  )
}
export default AppRoutes
