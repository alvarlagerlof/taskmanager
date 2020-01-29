import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

import './Popup.css'

class Popup extends React.Component {
  render() {
    return (
      <div className={this.props.open ? 'Popup Open' : 'Popup'}>
        <Card>{this.props.children}</Card>
      </div>
    )
  }
}

Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  x: PropTypes.number,
  y: PropTypes.number
}

export default Popup
