// @flow
import moment from "moment"
export const contructPaths = (TEMPLATE, newParams) => {
  let newPath = ""
  try {
    newPath = contructPath(TEMPLATE, newParams)
  } catch (error) {
    console.log(error)
  }
  return newPath
}
export const parseUser = (token, listUser) => {
  return token.map(value => {
    return listUser.find(element => {
      return element._id === value
    }).name
  })
}
export const parseUserId = (token, listUser) => {
  return token.map(value => {
    const user = listUser.find(element => {
      return element._id === value
    })
    if (user) {
      return user.tekoId
    }
  })
}
export const parseOneIdUser = (token, listUser) => {
  return listUser.find(element => {
    return element._id === token
  })
}
export const contructPath = (TEMPLATE, params) => {
  let path = TEMPLATE
  for (const k in params) {
    const key = "<" + k + ">"
    if (path.indexOf(key) === -1) {
      throw new Error("Không tồn tại key " + k + " trong template: " + TEMPLATE)
    }
    path = path.replace(key, params[k])
  }
  // Replace date/month
  if (path.indexOf("<today>") !== -1) {
    path = path.replace("<today>", moment().format("YYYYMMDD"))
  }
  return path
}
