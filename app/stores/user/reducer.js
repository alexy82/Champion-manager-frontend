// @flow
import * as types from "./action-types"
import _ from "lodash"
const originalInitialState = JSON.parse(
  JSON.stringify({
    providers: [],
    filter: {
      pageSize: 30,
      totalCount: 0,
      currentPage: 0,
      allowedPageSizes: [10, 30, 50, 100]
    },
    loading: false,
    data: [],
    userDetail: {
      id: 3,
      first_name: "Long",
      last_name: "Nguyễn Hoàng",
      email: "long.nh@teko.vn",
      active: true,
      created_at: "2019-08-30T09:27:37",
      updated_at: "2019-08-30T09:27:39",
      last_login: null,
      roles: [],
      permissions: [{ id: 5, key: "view_invoice_detail", name: "Xem chi tiết hóa đơn", desc: "View Invoice Detail" }],
      picture: "https://lh3.googleusercontent.com/a-/AAuE7mBu3MhBCe_c_kj2b_XevSl4vsUBPU6p5TiWzgG-",
      name: "Nguyễn Hoàng Long"
    },
    loadingList: false,
    loadingEdit: false,
    dataSelect: []
  })
)
export default function reduce(state = originalInitialState, action) {
  let newState = _.cloneDeep(state)
  switch (action.type) {
    case types.SET_CURRENT_PAGE:
      newState.filter.currentPage = action.page
      return newState
    case types.SET_PAGE_SIZE:
      newState.filter.pageSize = action.pageSize
      newState.filter.currentPage = 0
      return newState
    case types.CHECK_SSO_TOKEN:
      return {
        ...newState,
        user: action.user.data.data
      }
    case types.SET_DATA_ALL_USER:
      if (action.data && Array.isArray(action.data.items)) {
        newState.data = action.data.items
        newState.filter.totalCount = action.data.total
        return newState
      } else {
        newState.data = []
        newState.filter.totalCount = 0
        return newState
      }
    case types.SET_LIST_USER:
      return {
        ...newState,
        data: action.data.items
      }
    case types.SET_LOADING_USER:
      return {
        ...newState,
        loadingList: action.status
      }
    case types.SET_LOADING_USER_EDIT:
      return {
        ...newState,
        loadingEdit: action.status
      }
    case types.SET_USER_DETAIL:
      action.data.name = action.data.last_name + " " + action.data.first_name
      return {
        ...newState,
        userDetail: action.data
      }
    case types.SET_INPUT_DETAIL:
      return {
        ...newState,
        userDetail: {
          ...newState.userDetail,
          [action.typeInput]: action.value
        }
      }
    case types.SET_DATA_ALL_USER_SELECT:
      return {
        ...newState,
        dataSelect: action.data
      }
    default:
      return newState
  }
}
