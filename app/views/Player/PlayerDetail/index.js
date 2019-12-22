import React from "react"
import { connect } from "react-redux"
import PlayerView from "./../PlayerView"
import _, { cloneDeep } from "lodash"
import { getAllPermission } from "./../../../stores/role/actions"
import { withLoadingPage } from "./../../Utils/loadingPage"
import { havePermission } from "./../../utilities/permission"
import { getDetailPlayer } from "../../../stores/player/actions"
class PlayerDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      input: {},
      isEmptyInput: true,
      player: ""
    }
  }
  getDetail = async () => {
    console.log(this.props.match.params.id, "id parramsssssssssssss")
    await this.props.dispatch(getDetailPlayer(this.props.match.params.id))
  }
  getPermission = async () => {
    this.props.dispatch(getAllPermission())
  }
  componentDidMount = this.props.loadingHelper(async () => {
    await this.getPermission()
    await this.getDetail()
  })
  componentDidUpdate(prevProps) {
    if ((this.props.player && this.state.isEmptyInput) || !_.isEqual(prevProps.player, this.props.player)) {
      this.setState({ input: cloneDeep(this.props.player), isEmptyInput: false })
    }
  }
  render() {
    return (
      <PlayerView
        input={this.state}
        errors={this.state.errors}
        loadingButton={this.state.loadingButton}
        isDisable={!havePermission(this.props.user, "update_player")}
        {...this.props}
      />
    )
  }
}
const mapStateToProps = state => {
  console.log("test")
  console.log(state)
  console.log("test")
  return {
    player: state.player.detail,
    permissions: state.role.permission,
    user: state.user.userDetail
  }
}
export default connect(mapStateToProps)(withLoadingPage(PlayerDetail))
