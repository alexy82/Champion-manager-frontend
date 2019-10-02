import Swal from "sweetalert2"
import { errorConfig } from "./../utils/constant"
export function defaultErrorPopup(params) {
  Swal.fire({
    type: "error",
    title: "Oops...",
    text: "Đã xảy ra lỗi khi tải danh sách hóa đơn, nếu F5 lại không được anh/chị vui lòng liên hệ team code",
    allowOutsideClick: false,
    confirmButtonText: "Về trang chủ",
    ...params
  }).then(() => {
    window.location.href = "/"
  })
}
export function countDownSuccessPopup(action, test, params) {
  let timerInterval
  Swal.fire({
    type: "success",
    title: "Thành công",
    html: `<p>${test}</p><p>Bạn sẽ trở về trang trước sau <strong></strong> giây </p> `,
    allowOutsideClick: false,
    timer: 5000,
    onBeforeOpen: () => {
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("strong").textContent = (Swal.getTimerLeft() / 1000).toFixed(0)
      }, 100)
    },
    showConfirmButton: false,
    onClose: () => {
      clearInterval(timerInterval)
    },
    ...params
  }).then(() => {
    action()
  })
}
export function getFooterDetailError(msg) {
  return `<p>Chi tiết lỗi <i>${msg}</i></p>`
}
export function handleError(objectName) {
  return (error, defaultMsg) => {
    console.log(error.response, error.response && error.response.status)
    if (error.response && error.response.status) {
      const config = errorConfig[error.response.status]
      defaultErrorPopup({
        title: config.title(objectName),
        text: config.text(objectName),
        footer: getFooterDetailError(error.message)
      })
    } else {
      defaultErrorPopup({
        text: defaultMsg,
        footer: getFooterDetailError(error.message)
      })
    }
  }
}
