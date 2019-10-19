import { Grid } from "@material-ui/core"
import React from "react"
export function LabelControlHorizon(props) {
  const { label } = props
  return (
    <Grid item container xs={12}>
      <Grid item xs={4} style={props.styleLabel}>
        <strong>{label}</strong>:{" "}
      </Grid>
      <Grid item container xs={8} style={props.styleControl}>
        {props.control}
      </Grid>
    </Grid>
  )
}
export function LabelControlVertical(props) {
  const { label } = props
  return (
    <React.Fragment>
      <strong>{label} </strong>
      {props.control}
    </React.Fragment>
  )
}
