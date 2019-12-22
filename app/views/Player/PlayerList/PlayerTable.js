import React from "react"
import { Icon } from "@material-ui/core"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import { withTable } from "../../Utils/table"
import { withPaper } from "../../Utils/paper"
import { Tooltip, IconButton } from "@material-ui/core"
class PlayerTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("********************************************************")
    console.log(this.props)
    console.log("********************************************************")
    const { players, isUpdate, isDelete, confirmDialog } = this.props
    return (
      <React.Fragment>
        {players ? (
          <TableBody>
            {players.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>
                    <Card style={{ width: 180 }}>
                      <CardActionArea>
                        <CardContent>
                          <img width="140" height="186" alt="Contemplative Reptile" src={row.src} title="Contemplative Reptile" />
                        </CardContent>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="p">
                            {row.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {row.desc}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </TableCell>
                  <TableCell>{row.birth}</TableCell>
                  <TableCell>{row.team}</TableCell>
                  <TableCell>{row.GF}</TableCell>
                  <TableCell align={"right"}>
                    {isUpdate ? (
                      <Link to={{ pathname: "/player/" + row.id }}>
                        <Tooltip title="Xem chi tiết cầu thủ" placement="top">
                          <IconButton style={{ color: "rgb(98, 159, 218)" }}>
                            <Icon>remove_red_eye</Icon>
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}
                    {isDelete ? (
                      <Tooltip title="Xóa cầu thủ" placement="top">
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
export default withPaper(withTable(PlayerTable, ["#", "", "Ngày sinh", "Đội hiện tại", "Tổng bàn thắng", ""]), "group", "Danh sách cầu thủ")
