import React from "react"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { withTable } from "./../../Utils/table"
import { withPaper } from "./../../Utils/paper"
class UserTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      loading: false,
      groupList: {},
      openAddDialog: false,
      expanded: true,
      confirmDialog: false
    }
  }
  render() {
    const { users } = this.props
    return (
      <React.Fragment>
        {users ? (
          <TableBody>
            {users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        ) : null}
      </React.Fragment>
    )
  }
}
export default withPaper(withTable(UserTable, ["#", "Tên", "Họ", "CMND", "Tài khoản", "Ngày tạo"]), "group", "Danh sách user")
