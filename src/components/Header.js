import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import modalTypes from './modals'
import { showModal } from '../actions/modalActions'
import { setCurrentList } from '../actions/listActions'

import Button from './Button'
import ListSelector from './ListSelector'
import ListEdit from './ListEdit'

import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedList: this.props.lists.currentList,
      selectorOpen: false
    }

    this.addTodo = this.addTodo.bind(this)
    this.addList = this.addList.bind(this)
  }

  generateStatus() {
    const done = this.props.todos.items
      .filter(item => item.done)
      .filter(item => item.list === this.props.lists.currentList).length

    const left = this.props.todos.items
      .filter(item => !item.done)
      .filter(item => item.list === this.props.lists.currentList).length

    return `You have completed ${done} ${done === 1 ? 'task' : 'tasks'}, and have ${left} ${
      left === 1 ? 'task' : 'tasks'
    } left`
  }

  addTodo() {
    this.props.showModal(modalTypes.AddTodoModal, {
      title: 'New task',
      subtitle: null,
      closeButton: true,
      padded: true
    })
  }

  addList() {
    this.props.showModal(modalTypes.AddListModal, {
      title: 'New list',
      subtitle: null,
      closeButton: true,
      padded: true
    })
  }

  render() {
    return (
      <div className="Header">
        <div>
          <ListSelector />
          <p>{this.generateStatus()}</p>
          <ListEdit />
        </div>

        <Button click={this.addTodo}>
          <p>+</p>
          <p>New task</p>
        </Button>
      </div>
    )
  }
}

Header.propTypes = {
  todos: PropTypes.object.isRequired,
  lists: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  setCurrentList: PropTypes.func
}

const mapStateToProps = state => ({
  todos: state.todos,
  lists: state.lists,
  firebase: state.firebase
})

const mapDispatchToProps = dispatch => {
  return {
    showModal: (type, props) => dispatch(showModal(type, props)),
    setCurrentList: id => dispatch(setCurrentList(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
