// @flow
import * as React from "react"
import classNames from "classnames"
import Select from "react-select"
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Typography, TextField, Paper, Chip, MenuItem } from "@material-ui/core"
import { emphasize } from "@material-ui/core/styles/colorManipulator"
import CancelIcon from "@material-ui/icons/Cancel"
const styles = theme => ({
  selectContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    color: "#ffffff"
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "nowrap",
    flex: 1,
    alignItems: "center",
    overflowX: "hidden",
    fontSize: "14px"
  },
  chip: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(3)}px`
  },
  singleValue: {
    fontSize: 14
  },
  singleValueWhite: {
    fontSize: 14,
    color: "white"
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 14
  },
  paper: {
    position: "absolute",
    zIndex: 999,
    marginTop: theme.spacing(),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(3)
  }
})
function NoOptionsMessage(props) {
  return (
    <Typography className={props.selectProps.classes.noOptionsMessage} color="textSecondary" {...props.innerProps}>
      {props.children}
    </Typography>
  )
}
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      component="div"
      selected={props.isFocused}
      style={{
        fontWeight: props.isSelected ? 500 : 400,
        fontSize: 14
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}
function Placeholder(props) {
  return (
    <Typography className={props.selectProps.classes.placeholder} color="textSecondary" {...props.innerProps}>
      {props.children}
    </Typography>
  )
}
function SingleValue({ ...props }) {
  return <Typography className={props.selectProps.classes.singleValue}>{props.children}</Typography>
}
function SingleValueWhite({ ...props }) {
  return <Typography className={props.selectProps.classes.singleValueWhite}>{props.children}</Typography>
}
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}
function MultiValue(props) {
  return (
    <Chip
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      label={props.children}
      onDelete={props.removeProps.onClick}
      tabIndex={-1}
    />
  )
}
function Menu(props) {
  return (
    <Paper className={props.selectProps.classes.paper} square {...props.innerProps}>
      {props.children}
    </Paper>
  )
}
function SelectContainer(props) {
  return <div className={props.selectProps.classes.selectContainer}>{props.children}</div>
}
let components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SelectContainer,
  ValueContainer
}
class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
    multi: null
  }
  handleChange = name => value => {
    this.setState({
      [name]: value
    })
  }
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiFormControl: {
          root: {
            margin: "4px 0px",
            border: 0,
            display: "inline-flex",
            padding: 0,
            position: "relative",
            minWidth: 0,
            flexDirection: "column",
            height: "100%",
            justifyContent: "flex-end"
          }
        },
        MuiMenuItem: {
          root: {
            whiteSpace: "pre-wrap",
            minHeight: 24,
            height: "auto"
          }
        }
      }
    })
  render() {
    const { classes, theme, suggestions, value, handleChange, placeholderText, disabled, isMulti, useWhiteText } = this.props
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    }
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <Select
          autoWidth
          classes={classes}
          components={{
            ...components,
            SingleValue: useWhiteText ? SingleValueWhite : SingleValue
          }}
          isDisabled={disabled}
          isMulti={isMulti}
          onChange={handleChange}
          options={suggestions}
          placeholder={placeholderText}
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "pre"
          }}
          styles={selectStyles}
          value={value}
        />
      </MuiThemeProvider>
    )
  }
}
export default withStyles(styles, { withTheme: true })(IntegrationReactSelect)
