import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTodo, updateTodo } from '../actions/todoActions'
import IconButton from './IconButton'
import Textarea from 'react-textarea-autosize'

import './Todo.css'
import Checkbox from './Checkbox'

class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      done: this.props.done,
      title: this.props.title,
      text: this.props.text,
      focused: false
    }

    this.delete = this.delete.bind(this)

    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleText = this.handleText.bind(this)

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  delete(id) {
    this.props.deleteTodo(id)
  }

  handleCheckbox(e) {
    this.setState({ done: e.target.checked })
    this.props.updateTodo({
      id: this.props.id,
      title: this.state.title,
      text: this.state.text,
      done: !this.state.done
    })
  }

  handleText(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onBlur() {
    this.setState({ focused: false })
    this.props.updateTodo({
      id: this.props.id,
      title: this.state.title,
      text: this.state.text,
      done: this.state.done
    })
  }

  onFocus() {
    this.setState({ focused: true })
  }

  render() {
    return (
      <div className={this.props.done && !this.state.focused ? 'Todo done' : 'Todo'}>
        <Checkbox change={this.handleCheckbox} checked={this.state.done} />
        <div>
          <span>
            <Textarea
              placeholder="Title"
              name="title"
              onChange={this.handleText}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.title}
            />
          </span>
          <Textarea
            placeholder="Description"
            name="text"
            onChange={this.handleText}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.text}
          />
        </div>
        <div>
          <IconButton icon="delete_outline" size="small" click={() => this.delete(this.props.id)} />
        </div>
      </div>
    )
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => dispatch(deleteTodo(id)),
    updateTodo: todo => dispatch(updateTodo(todo))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Todo)
