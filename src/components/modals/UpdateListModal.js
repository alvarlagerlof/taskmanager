import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateList } from '../../actions/listActions'

import Input from '../Input'
import Button from '../Button'

import './UpdateListModal.css'

class UpdateListModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.lists.items.find(item => item.id === this.props.lists.currentList).name
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.updateList({
      id: this.props.lists.currentList,
      name: this.state.name
    })

    this.setState({
      name: ''
    })

    this.props.hideModal()
  }

  render() {
    return (
      <div className="UpdateListModal">
        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            value={this.state.name}
            change={this.onChange}
            placeholder="New name"
            autofocus
          />
          <Button type="submit">Change name</Button>
        </form>
      </div>
    )
  }
}

UpdateListModal.propTypes = {
  updateList: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    updateList: list => dispatch(updateList(list))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateListModal)
