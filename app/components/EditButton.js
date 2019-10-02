import * as React from "react"
import Icon from "@material-ui/core/Icon"
import Grid from "@material-ui/core/Grid"
const EditButton = ({ editing }) => {
  if (editing) {
    return (
      <Grid container>
        <Icon>close-circle-outline</Icon>
        <Icon>check-outline</Icon>
      </Grid>
    )
  } else {
    return (
      <Grid>
        <Icon>pencil-outline</Icon>
      </Grid>
    )
  }
}
export default EditButton
