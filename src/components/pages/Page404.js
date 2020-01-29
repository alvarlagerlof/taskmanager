import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import notFoundImage from '../../assets/undraw_startled_8p0r.svg'
import './Page404.css'

import Container from '../Container'
import Button from '../Button'
import Toolbar from '../Toolbar'

class Page404 extends Component {
  render() {
    return (
      <div className="Page404">
        <Toolbar />

        <Container>
          <img src={notFoundImage} alt="404 monster" />
          <h1>Woah!</h1>
          <p>The unknown can be scary, just like this url.</p>

          <Link to="/">
            <Button>Go back home?</Button>
          </Link>
        </Container>
      </div>
    )
  }
}

export default Page404
