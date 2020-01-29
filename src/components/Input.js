import React from 'react'
import Textarea from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import './Input.css'

class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        {this.props.multiline ? (
          <Textarea
            placeholder={this.props.placeholder}
            value={this.props.value}
            name={this.props.name}
            onChange={this.props.change}
            autoFocus={this.props.autofocus}
            autoComplete="off"
          />
        ) : (
          <input
            placeholder={this.props.placeholder}
            value={this.props.value}
            name={this.props.name}
            onChange={this.props.change}
            autoFocus={this.props.autofocus}
            autoComplete="off"
          />
        )}
      </div>
    )
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  change: PropTypes.func,
  autofocus: PropTypes.bool
}

export default Input
