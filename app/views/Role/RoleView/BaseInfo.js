import React from "react"
import { Grid } from "@material-ui/core"
import { LabelControlVertical } from "./../../Component/LabelControl"
import { withPaper } from "./../../Utils/paper"
import { withStyles } from "@material-ui/core/styles"
class RoleList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, isDisable, input, errors, handleChangeInput } = this.props
    return (
      <React.Fragment>
        <Grid container spacing={8}>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Tên nhóm quyền:"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Tên nhóm quyền..."
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("name", e.target.value)}
                    value={input.name ? input.name : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Mô tả:"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Mô tả..."
                    className={`${classes.inputDefaut}`}
                    onChange={e => handleChangeInput("desc", e.target.value)}
                    value={input.desc ? input.desc : ""}
                  />
                </React.Fragment>
              }
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
const style = () => ({
  spanError: {
    fontSize: "13px",
    fontStyle: "italic",
    color: "red",
    position: "absolute",
    bottom: 10
  },
  relative: {
    position: "relative"
  },
  inputDefaut: {
    height: 34,
    border: "1px solid #ccc",
    paddingLeft: 8,
    borderRadius: 4,
    width: "100%",
    fontSize: 15,
    "&:focus": {
      border: "2px solid  #1876d2"
    },
    "&:disabled": {
      backgroundColor: "hsl(0,0%,95%)",
      borderColor: "hsl(0,0%,90%)"
    }
  }
})
export default withStyles(style)(withPaper(RoleList, "info", "Thông tin chung"))
