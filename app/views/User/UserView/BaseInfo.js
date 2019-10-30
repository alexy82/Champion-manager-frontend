import React from "react"
import { Grid } from "@material-ui/core"
import { LabelControlVertical } from "./../../Component/LabelControl"
import { withPaper } from "./../../Utils/paper"
import { withStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"
class RoleList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, isDisable, roles, input, errors, handleChangeInput } = this.props
    console.log("%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(input)
    return (
      <React.Fragment>
        <Grid container float flex>
          {roles
            ? roles.map((role, index) => {
                return (
                  <Chip
                    xs={4}
                    key={index}
                    className={classes.relative}
                    flex
                    item
                    icon={<FaceIcon />}
                    label={role.name}
                    onClick={handleClick}
                    variant="outlined"
                  />
                )
              })
            : null}
        </Grid>
        <Grid container spacing={8}>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Email:"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Email"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("email", e.target.value)}
                    value={input.email ? input.email : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
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
              label={"SĐT"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="SĐT"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("mobile", e.target.value)}
                    value={input.mobile ? input.mobile : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical
              label={"Tài khoản"}
              control={
                <React.Fragment>
                  <input
                    disabled={isDisable}
                    placeholder="Tài khoản"
                    className={`${classes.inputDefaut} ${errors.name && errors.name.msg && "errorSelectInput"}`}
                    onChange={e => handleChangeInput("username", e.target.value)}
                    value={input.username ? input.username : ""}
                  />
                  {errors.name && errors.name.msg && <span className={classes.spanError}>{errors.name.msg}</span>}
                </React.Fragment>
              }
            />
          </Grid>
          <Grid className={classes.relative} flex item container xs={12}>
            <LabelControlVertical label="Ngày tạo:" control={input.created_at} />
          </Grid>
          <Grid className={classes.relative} flex item container xs={6}>
            <LabelControlVertical label="Đăng nhập lần cuối:" control={input.last_login} />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
const handleClick = () => {
  alert("You clicked the Chip.")
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
