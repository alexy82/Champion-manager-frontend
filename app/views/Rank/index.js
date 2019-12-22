import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import ListItem from "@material-ui/core/ListItem"
import Avatar from "@material-ui/core/Avatar"
import { withStyles, makeStyles } from "@material-ui/core/styles"
const rows = [
  createData(1, "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_48x48.png", "LiverPool", 12, 11, 1, 0, 28, 10, 18, 34),
  createData(2, "https://ssl.gstatic.com/onebox/media/sports/logos/UDYY4FSlty6fXFBzvFfcyw_48x48.png", "Leicester City", 12, 8, 2, 2, 29, 8, 21, 26),
  createData(3, "https://ssl.gstatic.com/onebox/media/sports/logos/fhBITrIlbQxhVB6IjxUO6Q_48x48.png", "Chelsea", 12, 8, 2, 2, 27, 17, 10, 26)
]
function createData(rank, avatar, name, mp, w, d, l, gf, ga, gd, pts) {
  return { rank, avatar, name, mp, w, d, l, gf, ga, gd, pts }
}
class Rank extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const classes = style
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="left">Club</TableCell>
              <TableCell>MP</TableCell>
              <TableCell>W</TableCell>
              <TableCell>D</TableCell>
              <TableCell>L</TableCell>
              <TableCell>GF</TableCell>
              <TableCell>GA</TableCell>
              <TableCell>GD</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.rank}>
                <TableCell>{row.rank}</TableCell>
                <TableCell className={classes.tablecell}>
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar className={classes.tablecell}>
                        <Avatar className={classes.tablecell} alt="Remy Sharp" src={row.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={row.name}></ListItemText>
                    </ListItem>
                  </List>
                </TableCell>
                <TableCell>{row.mp}</TableCell>
                <TableCell>{row.w}</TableCell>
                <TableCell>{row.d}</TableCell>
                <TableCell>{row.l}</TableCell>
                <TableCell>{row.gf}</TableCell>
                <TableCell>{row.ga}</TableCell>
                <TableCell>{row.gd}</TableCell>
                <TableCell>{row.pts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
const style = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  table: {
    minWidth: 600
  },
  tablecell: {
    padding: 0
  }
}))
export default withStyles(style)(Rank)
