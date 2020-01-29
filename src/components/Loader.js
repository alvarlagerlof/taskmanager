import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './Loader.css'

class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <TransitionGroup>
          <CSSTransition
            classNames="fade"
            key={toString(this.props.visible)}
            timeout={{ enter: 500, exit: 200 }}
          >
            {this.props.visible ? (
              <div className="Animation">
                <div className="Ring" />
                <div className="Ring" />
                <div className="Ring" />
              </div>
            ) : (
              this.props.children
            )}
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loader
