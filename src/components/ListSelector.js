import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import onClickOutside from 'react-onclickoutside'
import { showModal } from '../actions/modalActions'
import { setCurrentList } from '../actions/listActions'

import Popup from './Popup'
import PopupItem from './PopupItem'

import './ListSelector.css'

class ListSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.toggle = this.toggle.bind(this)

    this.selectItem = this.selectItem.bind(this)
  }

  selectItem(id) {
    this.props.setCurrentList(id)
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
      <div className="ListSelector">
        <div onClick={this.toggle}>
          {this.props.lists.currentList != null && (
            <div>
              <h3>
                {this.props.lists.items.find(item => item.id === this.props.lists.currentList).name}
              </h3>
              <div className="Triangle" />
            </div>
          )}
        </div>
        <Popup open={this.state.expanded}>
          {this.props.lists.items.map(item => (
            <PopupItem
              padded
              click={() => this.selectItem(item.id)}
              selected={item.id === this.props.lists.currentList}
              key={item.id}
            >
              {item.name}
            </PopupItem>
          ))}
        </Popup>
      </div>
    )
  }
}

ListSelector.propTypes = {
  lists: PropTypes.object.isRequired,
  setCurrentList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  lists: state.lists
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrentList: id => dispatch(setCurrentList(id)),
    showModal: (type, props) => dispatch(showModal(type, props))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onClickOutside(ListSelector))
