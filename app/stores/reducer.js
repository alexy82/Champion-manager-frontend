import { combineReducers } from "redux"
import user from "./user/reducer"
import app from "./app/reducer"
import constants from "./constants/reducer"
// Combines all reducers to a single reducer function
const reducer = combineReducers({
  app,
  user,
  constants
})
export default reducer
