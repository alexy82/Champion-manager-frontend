export function setParamsRequest(params) {
  var paramStrs = []
  for (var k in params) {
    const value = params[k] ? `${k}=${params[k]}` : ""
    if (value != "") {
      paramStrs.push(value)
    }
  }
  var result = paramStrs.join("&")
  return result ? `?${result}` : ""
}
