import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Button from './Button'

import './EmptyState.css'

class EmptyState extends Component {
  render() {
    return (
      <div className="EmptyState">
        <TransitionGroup>
          {this.props.visible ? (
            <CSSTransition classNames="fade" key="emptyState" timeout={{ enter: 500, exit: 200 }}>
              <div className="InfoBox">
                <img src={this.props.image} alt="Empty, no content" />
                <h2>{this.props.title}</h2>
                <p>{this.props.subtitle}</p>
                <Button click={this.props.buttonClick}>{this.props.buttonText}</Button>
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition classNames="switch" key="content" timeout={{ enter: 500, exit: 200 }}>
              {this.props.children}
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    )
  }
}

EmptyState.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonClick: PropTypes.func,
  visible: PropTypes.bool.isRequired
}

export default EmptyState
