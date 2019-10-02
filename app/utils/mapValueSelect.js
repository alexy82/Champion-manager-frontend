export const mapValueSelect = data => {
  if (data && data.length > 0) {
    const result = []
    data.map(value => {
      result.push({
        label: value.fullname,
        value: value.id
      })
    })
    return result
  }
}
