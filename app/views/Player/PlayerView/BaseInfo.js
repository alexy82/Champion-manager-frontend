import React from "react"
import { Grid } from "@material-ui/core"
import { LabelControlVertical } from "./../../Component/LabelControl"
import { withPaper } from "./../../Utils/paper"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
class PlayerInfo extends React.Component {
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
              label={"Họ Và Tên"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Họ và Tên"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("fullname", e.target.value)}
                    value={input.fullname ? input.fullname : ""}
                  />
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Ngày Sinh"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Ngày Sinh"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("birthday", e.target.value)}
                    value={input.birthday ? input.birthday : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Đội Bóng"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Đội Bóng"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("team", e.target.value)}
                    value={input.team ? input.team : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Ảnh"}
              control={
                <React.Fragment>
                  <input
                    placeholder="Ảnh"
                    id="outlined-button-file"
                    multiple
                    type="file"
                    accept="image/*"
                    className={`${classes.input} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                  <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span">
                      Upload
                    </Button>
                  </label>
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
  },
  input: {
    display: "none"
  }
})
export default withStyles(style)(withPaper(PlayerInfo, "info", "Thông tin chung"))
