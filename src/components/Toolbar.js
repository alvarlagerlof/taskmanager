import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/firebaseActions'
import onClickOutside from 'react-onclickoutside'

import './Toolbar.css'
import Popup from './Popup'
import PopupItem from './PopupItem'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filled: false,
      expanded: false
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) {
    this.setState({ filled: window.scrollY > 100 })
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  handleClickOutside() {
    this.setState({ expanded: false })
  }

  logout() {
    this.props.logout()
    this.setState({ expanded: false })
  }

  render() {
    return (
      <div className={this.state.filled ? 'Toolbar Filled' : 'Toolbar'}>
        <div className="Flex">
          <div>
            <Link to="/">
              <h3>Taskmaster</h3>
            </Link>
            <h2>{this.props.title}</h2>
          </div>
          <div>
            <img
              className={this.props.firebase.loggedIn ? 'Visible' : ''}
              onClick={this.toggle}
              src={this.props.firebase.user.photoURL}
              alt="Profile"
            />

            <Popup open={this.state.expanded}>
              <PopupItem padded click={this.logout}>
                Sign out
              </PopupItem>
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  firebase: state.firebase
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onClickOutside(Toolbar))
