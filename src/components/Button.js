import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

class Button extends React.Component {
  render() {
    return (
      <div className={this.props.white ? 'Button White' : 'Button'}>
        <button onClick={this.props.click} type={this.props.type}>
          {this.props.children}
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  click: PropTypes.func,
  white: PropTypes.bool,
  type: PropTypes.oneOfType(['submit']),
  children: PropTypes.node.isRequired
}

export default Button
