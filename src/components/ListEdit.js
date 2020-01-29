import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import onClickOutside from 'react-onclickoutside'
import modalTypes from './modals'
import { showModal } from '../actions/modalActions'

import Popup from './Popup'
import PopupItem from './PopupItem'
import PopupDivider from './PopupDivider'
import IconButton from './IconButton'

class ListEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.toggle = this.toggle.bind(this)
    this.updateList = this.updateList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.addList = this.addList.bind(this)
  }

  updateList() {
    this.props.showModal(modalTypes.UpdateListModal, {
      title: `Change name`,
      subtitle: `Set a new name for the list "${
        this.props.lists.items.find(item => item.id === this.props.lists.currentList).name
      }"`,
      closeButton: true,
      padded: true
    })

    this.setState({ expanded: false })
  }

  deleteList() {
    this.props.showModal(modalTypes.DeleteListModal, {
      title: `Delete list?`,
      subtitle: `"${
        this.props.lists.items.find(item => item.id === this.props.lists.currentList).name
      }" will be deleted. This action cannot be undone.`,
      closeButton: true,
      padded: true
    })

    this.setState({ expanded: false })
  }

  addList() {
    this.props.showModal(modalTypes.AddListModal, {
      title: 'New list',
      subtitle: null,
      closeButton: true,
      padded: true
    })

    this.setState({ expanded: false })
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  handleClickOutside() {
    this.setState({ expanded: false })
  }

  render() {
    return (
      <div className="ListEdit">
        <IconButton icon="more_horiz" size="tiny" click={this.toggle} />
        <Popup open={this.state.expanded}>
          <PopupItem padded click={this.updateList} key="create">
            <p>Change name</p>
          </PopupItem>

          <PopupItem padded click={this.deleteList} key="create">
            <p>Delete list</p>
          </PopupItem>

          <PopupDivider />

          <PopupItem padded click={this.addList} key="create">
            New list
          </PopupItem>
        </Popup>
      </div>
    )
  }
}

ListEdit.propTypes = {
  lists: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    showModal: (type, props) => dispatch(showModal(type, props))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onClickOutside(ListEdit))
