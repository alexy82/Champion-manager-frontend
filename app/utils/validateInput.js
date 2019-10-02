export const validateUtils = (data, rules, message) => {
  const errMsg = []
  Object.keys(data).forEach(key => {
    if (rules[key]) {
      const rulesList = Object.keys(rules[key])
      for (let i = 0; i < rulesList.length; i++) {
        let hasError = false
        const rule = rulesList[i]
        switch (rule) {
          case "required":
            if (!data[key]) {
              errMsg.push(message[key][rule])
              hasError = true
            }
            break
          case "number":
            if (!data[key] || data[key] <= 0) {
              errMsg.push(message[key][rule])
              hasError = true
            }
            break
          case "type":
            if (data[key]) {
              switch (rules[key].type) {
                case "integer":
                  if (!Number.isInteger(Number(data[key]))) {
                    errMsg.push(message[key][rule])
                    hasError = true
                  }
                  break
              }
            }
            break
          case "custom":
            if (rules[key].custom()) {
              errMsg.push(message[key][rule])
              hasError = true
            }
            break
          case "regex":
            if (data[key]) {
              if (!data[key].match(rules[key].regex)) {
                errMsg.push(message[key][rule])
                hasError = true
              }
            }
            break
        }
        if (hasError) break
      }
    }
  })
  return errMsg
}
