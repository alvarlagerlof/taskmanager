import { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 300)
    }
  }

  render() {
    return this.props.children
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.any.isRequired
}

export default ScrollToTop
