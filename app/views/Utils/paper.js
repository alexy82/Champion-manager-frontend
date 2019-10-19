import { Paper } from "@material-ui/core"
import React from "react"
import { Icon } from "@material-ui/core"
const style = {
  paperBox: {
    padding: "16px 16px 8px",
    borderTop: "5px solid #2f71c454"
  },
  titleBox: {
    color: "#5d9cec",
    padding: "0 0 16px 0",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titlePaper: {
    display: "flex",
    alignItems: "center"
  }
}
export function withPaper(Wrap, icon, label) {
  return class cls extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <Paper style={style.paperBox}>
          <h3 style={style.titleBox}>
            <div style={style.titlePaper}>
              <Icon style={{ marginRight: 10 }}>{icon}</Icon>
              {label}
            </div>
            {this.props.rightBtn}
          </h3>
          <Wrap {...this.props} />
        </Paper>
      )
    }
  }
}
