import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { hideModal } from '../actions/modalActions'

import IconButton from './IconButton'

import './Modal.css'

class Modal extends Component {
  constructor(props) {
    super(props)

    this.hideModal = this.hideModal.bind(this)
  }

  hideModal() {
    this.props.hideModal()
  }

  render() {
    if (!this.props.modal.open) {
      return null
    }

    const ModalContent = this.props.modal.type

    // TODO: Make the animation work

    return (
      <div>
        <CSSTransition
          in={this.props.modal.open}
          timeout={900}
          classNames="slide"
          unmountOnExit
          key={'hej'}
          onExited={() => {
            console.log('exit')
          }}
        >
          <ReactModal
            isOpen={true}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.hideModal}
            ariaHideApp={false}
            closeTimeoutMS={900}
            className={this.props.modal.props.padded ? 'Padded Modal' : 'Modal'}
          >
            <div>
              {this.props.modal.props.title && (
                <div className="Flex">
                  <div>
                    <h2>{this.props.modal.props.title}</h2>
                    <p>{this.props.modal.props.subtitle}</p>
                    <p>{this.props.modal.props.closeButton}</p>
                  </div>
                  <div>
                    <IconButton icon="close" size="tiny" click={this.hideModal} />
                  </div>
                </div>
              )}

              <div className="Content">
                <ModalContent hideModal={this.hideModal} />
              </div>
            </div>
          </ReactModal>
        </CSSTransition>
      </div>
    )
  }
}

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  modal: state.modal
})

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
