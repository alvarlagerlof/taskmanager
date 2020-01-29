import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showModal } from '../../actions/modalActions'
import { login } from '../../actions/firebaseActions'
import modalTypes from '../modals'

import TodosList from '../TodosList'
import Group from '../Group'
import Container from '../Container'
import Toolbar from '../Toolbar'
import Header from '../Header'
import Button from '../Button'
import Loader from '../Loader'
import EmptyState from '../EmptyState'

import emptyImage from '../../assets/undraw_no_data_qbuo.svg'
import errorImage from '../../assets/undraw_warning_cyit.svg'
import welcomeImage from '../../assets/undraw_authentication_fsn5.svg'
import './PageHome.css'

class PageHome extends Component {
  constructor(props) {
    super(props)

    this.showWelcomeDialog = this.showWelcomeDialog.bind(this)
    this.addList = this.addList.bind(this)
  }

  showWelcomeDialog() {
    this.props.showModal(modalTypes.WelcomeModal, {
      title: null,
      subtitle: null,
      closeButton: false,
      padded: false
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
      <div className="PageHome">
        <Toolbar title="Your lists" />
        <Container>
          <Loader visible={this.props.firebase.loading}>
            {!this.props.firebase.loggedIn ? (
              <EmptyState
                image={welcomeImage}
                title="Welcome"
                subtitle="To use Taskmaster, you need to sign in with Google first"
                buttonText="Sign in"
                buttonClick={this.props.login}
                visible
              />
            ) : (
              <Loader
                visible={
                  (this.props.todos.loading && this.props.todos.error !== true) ||
                  (this.props.lists.loading && this.props.todos.error !== true)
                }
              >
                {this.props.todos.error === true || this.props.lists.error === true ? (
                  <EmptyState
                    image={errorImage}
                    title="Ops!"
                    subtitle="Something went wrong while getting your tasks"
                    buttonText="Retry"
                    buttonClick={console.log('implement retry both ')}
                    visible
                  />
                ) : (
                  <EmptyState
                    image={emptyImage}
                    title="No lists here"
                    subtitle="Fix this horrible problem with the button below"
                    buttonText="Create a list"
                    buttonClick={this.addList}
                    visible={this.props.lists.items.length === 0}
                  >
                    <div>
                      <Group>
                        <Header />
                      </Group>

                      <Group title="Tasks">
                        <TodosList />
                      </Group>
                    </div>
                  </EmptyState>
                )}
              </Loader>
            )}
          </Loader>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Link to="/about">
            <Button>About this site</Button>
          </Link>
          <Button click={this.showWelcomeDialog}>Show welcome dialog</Button>
        </Container>
      </div>
    )
  }
}

PageHome.propTypes = {
  showModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  lists: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists,
  todos: state.todos,
  firebase: state.firebase
})

const mapDispatchToProps = dispatch => {
  return {
    showModal: (type, props) => dispatch(showModal(type, props)),
    login: () => dispatch(login())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHome)
