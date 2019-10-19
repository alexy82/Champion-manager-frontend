import React from "react"
import { Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
export function withTable(Wraper, column) {
  // Create Table cover component that is defined "Wraper"
  // Wraper: this is Body of table
  // column: this is array that define column when render
  // Higher Order Component pattern
  return class cls extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      const tableHead = {
        color: "white",
        backgroundColor: "#629fda"
      }
      return (
        <Table
          style={{
            padding: "8px 24px 8px 12px"
          }}
        >
          <TableHead>
            <TableRow>
              {column.map((e, index) => (
                <TableCell style={tableHead} key={index}>
                  {e}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <Wraper {...this.props} />
        </Table>
      )
    }
  }
}
