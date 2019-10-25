import React from "react"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { Icon, Tooltip, IconButton } from "@material-ui/core"
import { Link } from "react-router-dom"
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
    const { users, isUpdate, isDelete, confirmDialog } = this.props
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(users)
    return (
      <React.Fragment>
        {users ? (
          <TableBody>
            {users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  {user.is_active ? <TableCell>Đang hoạt động</TableCell> : <TableCell>Ngưng hoạt động</TableCell>}
                  <TableCell>{user.last_login}</TableCell>
                  <TableCell align={"right"}>
                    {isUpdate ? (
                      <Link to={{ pathname: "/user/" + user.id }}>
                        <Tooltip title="Xem chi tiết quyền" placement="top">
                          <IconButton style={{ color: "rgb(98, 159, 218)" }}>
                            <Icon>remove_red_eye</Icon>
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}
                    {isDelete ? (
                      <Tooltip title="Xóa quyền" placement="top">
                        <IconButton onClick={() => confirmDialog(user.id)} style={{ color: "#ff1a35" }}>
                          <Icon>close</Icon>
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        ) : null}
      </React.Fragment>
    )
  }
}
export default withPaper(
  withTable(UserTable, ["#", "Họ và Tên", "Tài khoản", "Ngày tạo", "Tình Trạng", "Đăng nhập gần nhất", ""]),
  "group",
  "Danh sách user"
)
