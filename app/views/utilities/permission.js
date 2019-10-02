export const havePermission = (user, permission) => {
  if (Object.keys(user).length > 0 && user.permissions) {
    const havePermiss = user.permissions.find(element => {
      return element.key === permission
    })
    if (havePermiss) {
      return true
    } else {
      return false
    }
  }
  return false
}
export const routePermission = (user, permission) => {
  if (Object.keys(user).length > 0) {
    const havePermiss = user.permission.find(element => {
      return element.key === permission
    })
    if (havePermiss) {
      return true
    } else {
      return false
    }
  }
}
