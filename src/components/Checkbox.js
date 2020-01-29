import React from 'react'
import PropTypes from 'prop-types'

import './Checkbox.css'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: this.props.checked
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      checked: !this.state.checked
    })

    this.props.change({ target: { checked: !this.state.checked } })
  }

  render() {
    return (
      <div className={this.state.checked ? 'Checkbox Checked' : 'Checkbox'} onClick={this.toggle}>
        <div checked={this.state.checked}>
          <div />
        </div>
      </div>
    )
  }
}

Checkbox.propTypes = {
  change: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
}

export default Checkbox
