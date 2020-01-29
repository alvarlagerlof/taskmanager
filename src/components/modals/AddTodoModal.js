import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uniqid from 'uniqid'
import { createTodo } from '../../actions/todoActions'

import Input from '../Input'
import Button from '../Button'

import './AddTodoModal.css'

class AddTodoModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.createTodo({
      id: uniqid(),
      title: this.state.title,
      text: this.state.text,
      done: false,
      list: this.props.lists.currentList,
      timestamp: new Date().getTime()
    })

    this.setState({
      title: '',
      text: ''
    })

    this.props.hideModal()
  }

  render() {
    return (
      <div className="AddTodoModal">
        <form onSubmit={this.onSubmit}>
          <Input
            name="title"
            value={this.state.title}
            change={this.onChange}
            placeholder="Title"
            autofocus
          />
          <Input
            name="text"
            value={this.state.text}
            change={this.onChange}
            placeholder="Description"
            multiline
          />
          <Button type="submit">Add task</Button>
        </form>
      </div>
    )
  }
}

AddTodoModal.propTypes = {
  createTodo: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    createTodo: todo => dispatch(createTodo(todo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoModal)
