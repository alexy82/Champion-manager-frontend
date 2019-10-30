import React from "react"
import DualListBox from "react-dual-listbox"
import { connect } from "react-redux"
import { withPaper } from "./../../Utils/paper"
class SetGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameGroup: this.props.nameGroup
    }
  }
  render() {
    const { options, selected, onChange, disabled } = this.props
    const optionSettings = []
    options.map(option =>
      optionSettings.push({
        value: option.id,
        label: option.name,
        permission: option.permissions
      })
    )
    return (
      <React.Fragment>
        <DualListBox
          disabled={disabled}
          options={optionSettings}
          canFilter
          filterPlaceholder="Lọc..."
          selected={selected}
          onChange={selected => onChange(selected)}
        />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    nameGroup: state.nameGroup
  }
}
export default connect(mapStateToProps)(withPaper(SetGroup, "group", "Phân nhóm"))
