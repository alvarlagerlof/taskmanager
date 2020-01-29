import React from 'react'
import MaterialIcon from 'material-icons-react'
import PropTypes from 'prop-types'

import './IconButton.css'

class Button extends React.Component {
  render() {
    return (
      <div className="IconButton" onClick={this.props.click}>
        <MaterialIcon icon={this.props.icon} size={this.props.size} />
      </div>
    )
  }
}

Button.propTypes = {
  click: PropTypes.func,
  icon: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
}

export default Button
