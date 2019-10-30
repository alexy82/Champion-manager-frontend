import React from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { withPaper } from "./../../Utils/paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
class RoleInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permisstion: this.props.permisstions
    }
  }
  render() {
    // const { classes } = this.props
    const classes = useStyles
    const { role } = this.props
    return (
      <React.Fragment>
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {role.map((role, index) => {
            return (
              <ListItem button key={index}>
                <ListItemText primary={role.name} />
              </ListItem>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))
const mapStateToProps = state => {
  return {
    permisstion: state.permisstion
  }
}
export default connect(mapStateToProps)(withPaper(RoleInfo, "group", "Quyền"))
