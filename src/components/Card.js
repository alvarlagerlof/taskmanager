import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Card.css'

class Card extends Component {
  render() {
    return <div className="Card">{this.props.children}</div>
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default Card
