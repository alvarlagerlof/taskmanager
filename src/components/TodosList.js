import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import { getTodos } from '../actions/todoActions'
import { showModal } from '../actions/modalActions'
import modalTypes from './modals'

import Todo from './Todo'
import Card from './Card'
import EmptyState from './EmptyState'

import emptyImage from '../assets/undraw_no_data_qbuo.svg'
import './TodosList.css'

class TodosList extends Component {
  constructor(props) {
    super(props)

    this.addTodo = this.addTodo.bind(this)
  }

  addTodo() {
    this.props.showModal(modalTypes.AddTodoModal, {
      title: 'New task',
      subtitle: null,
      closeButton: true,
      padded: true
    })
  }

  render() {
    return (
      <div className="TodosList">
        <Card>
          <EmptyState
            image={emptyImage}
            title="It's empty here"
            subtitle="Fill this void with the button below"
            buttonText="Add a task"
            buttonClick={this.addTodo}
            visible={this.props.todos.length === 0}
          >
            <List props={this.props} />
          </EmptyState>
        </Card>
      </div>
    )
  }
}

const List = ({ props }) => {
  return (
    <FlipMove
      staggerDelayBy={50}
      appearAnimation="fade"
      enterAnimation="fade"
      leaveAnimation="fade"
    >
      {props.todos.map(todo => (
        <Todo key={todo.id} id={todo.id} done={todo.done} title={todo.title} text={todo.text} />
      ))}
    </FlipMove>
  )
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  lists: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos.items.filter(item => item.list === state.lists.currentList),
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    showModal: (type, props) => dispatch(showModal(type, props)),
    getTodos: () => dispatch(getTodos())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)
