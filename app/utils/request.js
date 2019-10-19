// @ts-check
import axios from "axios"
import cookie from "react-cookies"
import * as config from "./../config"
// Create axios service
const service = axios.create({
  baseURL: config.protocol + "://" + config.hosts.championship,
  timeout: 15000
})
// Xử lý request trước khi gửi đi
service.interceptors.request.use(
  config => {
    const accessToken = cookie.load("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken
    }
    return config
  },
  () => {
    // Do something with request error
  }
)
export default service
