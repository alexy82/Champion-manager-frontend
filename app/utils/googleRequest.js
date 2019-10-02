// @ts-check
import axios from "axios"
import * as config from "./../config"
// Create axios service
const service = axios.create({
  baseURL: config.protocol + "://www.googleapis.com",
  timeout: 15000
})
export default service
