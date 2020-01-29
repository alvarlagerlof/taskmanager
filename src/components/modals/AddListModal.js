import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uniqid from 'uniqid'
import { createList } from '../../actions/listActions'

import Input from '../Input'
import Button from '../Button'

import './AddListModal.css'

class AddListModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.createList({
      id: uniqid(),
      name: this.state.name
    })

    this.setState({
      name: ''
    })

    this.props.hideModal()
  }

  render() {
    return (
      <div className="AddListModal">
        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            value={this.state.name}
            change={this.onChange}
            placeholder="Name of the list"
            autofocus
          />
          <Button type="submit">Create list</Button>
        </form>
      </div>
    )
  }
}

AddListModal.propTypes = {
  createList: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    createList: list => dispatch(createList(list))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddListModal)
