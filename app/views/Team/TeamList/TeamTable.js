import React from "react"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { Link } from "react-router-dom"
import { Icon, Tooltip, IconButton } from "@material-ui/core"
import { withTable } from "../../Utils/table"
import { withPaper } from "../../Utils/paper"
// import moment from "moment"
class TeamTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { teams, isUpdate, isDelete, confirmDialog } = this.props
    console.log("hellom", this.props)
    // const { roles } = this.props
    return (
      <React.Fragment>
        {/* {roles ? (
          // <TableBody>
          //   {roles.map((row, index) => {
          //     return (
          //       <TableRow key={index}>
          //         <TableCell>{++index}</TableCell>
          //         <TableCell>{row.name}</TableCell>
          //         <TableCell>{row.desc}</TableCell>
          //         <TableCell>
          //           {moment(row.created_at)
          //             .add(7, "hours")
          //             .format("HH:mm:ss DD-MM-YYYY")}
          //         </TableCell>
          //         <TableCell>
          //           {moment(row.updated_at)
          //             .add(7, "hours")
          //             .format("HH:mm:ss DD-MM-YYYY")}
          //         </TableCell>
          //         <TableCell align={"right"}>
          //           {isUpdate ? (
          //             <Link to={{ pathname: "/player/" + row.id }}>
          //               <Tooltip title="Xem chi tiết cầu thủ" placement="top">
          //                 <IconButton style={{ color: "rgb(98, 159, 218)" }}>
          //                   <Icon>remove_red_eye</Icon>
          //                 </IconButton>
          //               </Tooltip>
          //             </Link>
          //           ) : null}
          //           {isDelete ? (
          //             <Tooltip title="Xóa cầu thủ" placement="top">
          //               <IconButton onClick={() => confirmDialog(row.id)} style={{ color: "#ff1a35" }}>
          //                 <Icon>close</Icon>
          //               </IconButton>
          //             </Tooltip>
          //           ) : null}
          //         </TableCell>
          //       </TableRow>
          //     )
          //   })}
          // </TableBody>
        ) : null} */}
        <TableBody>
          {teams.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>
                  <Icon>remove_red_eye</Icon>F.C Barcelona
                </TableCell>
                <TableCell>{row.stadium}</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Lionel Messi</TableCell>
                <TableCell align={"right"}>
                  {isUpdate ? (
                    <Link to={{ pathname: "/team/" + row.id }}>
                      <Tooltip title="Xem chi tiết đội bóng" placement="top">
                        <IconButton style={{ color: "rgb(98, 159, 218)" }}>
                          <Icon>remove_red_eye</Icon>
                        </IconButton>
                      </Tooltip>
                    </Link>
                  ) : null}
                  {isDelete ? (
                    <Tooltip title="Xóa đội bóng" placement="top">
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
      </React.Fragment>
    )
  }
}
export default withPaper(
  withTable(TeamTable, ["#", "Câu lạc bộ", "Sân chính", "Hạng gần nhất", "Cầu thủ ghi bàn nhiều nhất", ""]),
  "group",
  "Danh sách đội bóng"
)
