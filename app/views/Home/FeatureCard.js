import * as React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import { Grid, Paper, Typography } from "@material-ui/core"
import Svg from "react-inlinesvg"
class FeatureCard extends React.Component {
  render() {
    let { classes } = this.props
    let { title, content, style, svgSource } = this.props
    return (
      <Paper className={classes.paperContainer}>
        <Grid container className={classes.cardContainer}>
          <Grid item xs={4} sm={4} md={6} lg={6}>
            <Grid container className={classes.picture} style={style}>
              <Grid item>
                <Svg className={classes.transitionDemo} src={svgSource} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={8} md={6} lg={6} className={classes.title}>
            <Typography>
              <strong className={classes.titleBox}>{title}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.contentBox}>{content}</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
const styles = theme => ({
  paperContainer: {
    height: "100%",
    maxWidth: 450,
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0 2px 4px 4px rgba(0, 0, 0, 0.25)",
      transition: "box-shadow 0.4s ease-in-out"
    },
    "& svg": {
      width: "75px",
      height: "75px",
      filter: "invert(1)",
      transition: "transform .4s"
    },
    "&:hover $svg": {
      transform: "scale(1.3)"
    }
  },
  cardContainer: {
    alignItems: "center"
  },
  picture: {
    width: 150,
    height: 150,
    [theme.breakpoints.only("md")]: {
      width: 100,
      height: 100,
      "& svg": {
        width: 50,
        height: 50
      }
    },
    position: "relative",
    top: -theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.5)"
  },
  title: {
    textAlign: "center",
    "& p": {
      fontSize: "1.5rem",
      [theme.breakpoints.only("lg")]: {
        fontSize: "1.2rem"
      },
      [theme.breakpoints.only("md")]: {
        fontSize: "0.9rem"
      }
    }
  },
  contentBox: {
    [theme.breakpoints.only("md")]: {
      fontSize: "0.8rem"
    }
  }
})
export default withStyles(styles)(FeatureCard)
