import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import welcomeImage from '../../assets/undraw_to_do_list_a49b.svg'
import './WelcomeModal.css'

class WelcomeModal extends Component {
  render() {
    return (
      <div className="WelcomeModal">
        <h2>Welcome to</h2>
        <h2>Taskmaster</h2>
        <img src={welcomeImage} alt="Welcome" />
        <p>Let's start organizing your life!</p>
        <Button white click={this.props.hideModal}>
          Get started
        </Button>
      </div>
    )
  }
}

WelcomeModal.propTypes = {
  hideModal: PropTypes.func.isRequired
}

export default WelcomeModal
