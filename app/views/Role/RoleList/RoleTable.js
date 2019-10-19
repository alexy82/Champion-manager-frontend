import React from "react"
import { Icon, Tooltip, IconButton } from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { Link } from "react-router-dom"
import { withTable } from "./../../Utils/table"
import { withPaper } from "./../../Utils/paper"
import moment from "moment"
class RoleTable extends React.Component {
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
    const { roles, isUpdate, isDelete, confirmDialog } = this.props
    return (
      <React.Fragment>
        {roles ? (
          <TableBody>
            {roles.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{moment(row.created_at).format("HH:mm:ss DD-MM-YYYY")}</TableCell>
                  <TableCell>{moment(row.updated_at).format("HH:mm:ss DD-MM-YYYY")}</TableCell>
                  <TableCell align={"right"}>
                    {isUpdate ? (
                      <Link to={{ pathname: "/role/" + row.id }}>
                        <Tooltip title="Xem chi tiết quyền" placement="top">
                          <IconButton style={{ color: "rgb(98, 159, 218)" }}>
                            <Icon>remove_red_eye</Icon>
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}
                    {isDelete ? (
                      <Tooltip title="Xóa quyền" placement="top">
                        <IconButton onClick={() => confirmDialog(row.id)} style={{ color: "#ff1a35" }}>
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
export default withPaper(withTable(RoleTable, ["#", "Tên", "Mô tả", "Ngày tạo", "Ngày chỉnh sửa", ""]), "group", "Danh sách nhóm quyền")
