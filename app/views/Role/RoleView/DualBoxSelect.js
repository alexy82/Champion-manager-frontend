import React from "react"
import DualListBox from "react-dual-listbox"
import { withPaper } from "./../../Utils/paper"
class DualBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { options, selected, onChange, disabled } = this.props
    return (
      <React.Fragment>
        <DualListBox
          disabled={disabled}
          options={options}
          canFilter
          filterPlaceholder="Lọc..."
          selected={selected}
          onChange={selected => onChange(selected)}
        />
      </React.Fragment>
    )
  }
}
export default withPaper(DualBox, "group", "Phân quyền")
