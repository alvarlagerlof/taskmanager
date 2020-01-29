import React from 'react'
import PropTypes from 'prop-types'

import './PopupItem.css'

class PopupItem extends React.Component {
  constructor(props) {
    super(props)

    this.getClasses = this.getClasses.bind(this)
  }

  getClasses() {
    let classes = 'PopupItem'
    if (this.props.padded) classes += ' Padded'
    if (this.props.selected) classes += ' Selected'
    return classes
  }

  render() {
    return (
      <div className={this.getClasses()} onClick={this.props.click}>
        {this.props.children}
      </div>
    )
  }
}

PopupItem.propTypes = {
  click: PropTypes.func.isRequired,
  padded: PropTypes.bool,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool
}

export default PopupItem
