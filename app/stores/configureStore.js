import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import reducer from "./reducer"
import config from "../config"
const configureStore = () => {
  if (config.log_enabled) {
    return {
      ...createStore(reducer, applyMiddleware(thunk, logger))
    }
  } else {
    return {
      ...createStore(reducer, applyMiddleware(thunk))
    }
  }
}
const store = configureStore()
export default store
