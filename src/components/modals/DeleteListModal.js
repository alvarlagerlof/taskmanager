import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteList } from '../../actions/listActions'

import Button from '../Button'

import './DeleteListModal.css'

class DeleteListModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.deleteList(this.props.lists.currentList)

    this.props.hideModal()
  }

  render() {
    return (
      <div className="DeleteListModal">
        <form onSubmit={this.onSubmit}>
          <Button type="submit">Delete list</Button>
        </form>
      </div>
    )
  }
}

DeleteListModal.propTypes = {
  deleteList: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    deleteList: id => dispatch(deleteList(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteListModal)
