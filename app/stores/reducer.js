import { combineReducers } from "redux"
import user from "./user/reducer"
import role from "./role/reducer"
import player from "./player/reducer"
import app from "./app/reducer"
import team from "./app/reducer"
import constants from "./constants/reducer"
// Combines all reducers to a single reducer function
const reducer = combineReducers({
  app,
  user,
  role,
  player,
  team,
  constants
})
export default reducer
