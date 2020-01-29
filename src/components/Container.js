import React from 'react'
import PropTypes from 'prop-types'

import './Container.css'

class Container extends React.Component {
  render() {
    return <div className="Container">{this.props.children}</div>
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
