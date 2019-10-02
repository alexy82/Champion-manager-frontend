import * as config from "./../config"
import Swal from "sweetalert2"
export function getToast(position, timeout = 3000, container = "toast-container") {
  return Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timeout,
    customClass: {
      container: container
    }
  })
}
export const Toast = getToast("top-end", 5000)
export const BottomToast = getToast("bottom-start", 5000)
export const TopToast = getToast("top-start", 5000)
export const errorConfig = {
  "404": {
    title: objectName => {
      return `Không tìm thấy ${objectName}`
    },
    text: objectName => {
      return `Hệ thống không tìm thấy ${objectName}. Vui lòng trở lại trang chủ.`
    }
  },
  "400": {
    title: () => {
      return "Lỗi dữ liệu"
    },
    text: () => {
      return "Có lỗi khi gửi dữ liệu xuống hệ thống. Vui lòng thao tác lại nếu không được bạn vui lòng liên hệ team code"
    }
  },
  "500": {
    title: () => {
      return "Lỗi hệ thống"
    },
    text: () => {
      return "Bạn vui lòng F5 lại trang nếu hệ thống vẫn lỗi, bạn vui lòng báo với team code"
    }
  },
  "401": {
    title: () => {
      return "Không có quyền truy cập"
    },
    text: () => {
      return "Bạn không có quyền truy cập. Vui lòng xin quyền hoặc trở về trang chủ"
    }
  }
}
export let permissions = config.permission
