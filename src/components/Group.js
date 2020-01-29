import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Group.css'

class Group extends Component {
  render() {
    return (
      <div className="Group">
        {this.props.title && <span>{this.props.title}</span>}
        {this.props.children}
      </div>
    )
  }
}

Group.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Group
