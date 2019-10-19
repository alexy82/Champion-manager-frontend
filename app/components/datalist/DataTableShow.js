import React from "react"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"
import { connect } from "react-redux"
class DataTableShow extends React.Component {
  state = {
    columns: [],
    data: []
  }
  componentDidMount() {
    this.setState({
      columns: ["#", "Quyền", "Tên", "Ngày Tạo", "Ngày cập nhật"],
      data: [["1", "Admin", "Có tất cả quyền", "12/12/1998", "1/1/1998"], ["2", "Admin", "Có tất cả quyền", "12/12/1998", "1/1/1998"]]
    })
  }
  render() {
    let { classes } = this.props
    console.log("day ne")
    console.log(this)
    console.log(classes)
    return (
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            {this.state.columns.map(col => (
              <TableCell className={classes.tableHead} key={col}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {this.state.data && this.state.data.length > 0 ? (
          <TableBody>
            {this.state.data.map((row, index) => (
              <TableRow key={index}>
                {row.map(rowItem => (
                  <TableCell key={rowItem}>{rowItem}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableCell colSpan={20} className={classes.noData}>
              Không có dữ liệu
            </TableCell>
          </TableBody>
        )}
      </Table>
    )
  }
}
const mapStateToProps = state => {
  return {
    columns: state.columns,
    data: state.data
  }
}
const style = () => ({
  root: {
    padding: "8px 24px 8px 12px"
  },
  tableHead: {
    color: "white",
    backgroundColor: "#629fda"
  },
  noData: {
    textAlign: "center",
    fontSize: "17px",
    textTransform: "uppercase"
  }
})
export default connect(mapStateToProps)(withStyles(style)(DataTableShow))
