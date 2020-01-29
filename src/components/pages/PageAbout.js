import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Container from '../Container'
import Toolbar from '../Toolbar'
import Button from '../Button'

import picture from '../../assets/designteam.png'

import './PageAbout.css'

class PageAbout extends Component {
  // TODO: Make this pretty

  render() {
    return (
      <div className="PageAbout">
        <Toolbar title="About" />

        <Container>
          <img src={picture} alt="Desgin team" />

          <h2>Hi there!</h2>
          <br />
          <p>
            This is a simple todo app by Alvar Lagerlöf. It's created in React with Redux. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, odio sed tempor
            pellentesque, nunc ex ultrices odio, quis egestas elit lectus id dui. In volutpat nibh
            non vehicula porta. Donec bibendum augue neque, ut malesuada tortor sagittis feugiat.
            Nunc leo arcu, pharetra a ultricies quis, mattis non nisi. Vestibulum feugiat porta
            libero eu imperdiet. Aenean egestas ac dui eget iaculis. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec ornare
            nulla. Duis non tincidunt eros.
          </p>
          <br />
          <p>
            Phasellus eu diam posuere, interdum erat eu, auctor lacus. Nam eros eros, viverra ut
            dolor quis, elementum pharetra metus. Integer tincidunt commodo ligula quis posuere.
            Morbi sit amet viverra quam. Vivamus erat nisl, eleifend non tellus non, finibus commodo
            ligula. Nunc sit amet facilisis urna. Praesent at mauris ac est auctor condimentum et a
            lectus. Nullam urna nulla, commodo quis elementum nec, mattis et nisl.
          </p>
          <br />
          <p>
            In vehicula, urna sed sodales suscipit, ante nisi finibus eros, quis ultricies purus
            sapien nec arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Pellentesque vel nisi vel magna fringilla sollicitudin quis nec augue.
            Suspendisse eget sapien sem. Fusce congue cursus sapien, eget mollis elit mollis sed. In
            odio nunc, molestie sodales tellus nec, condimentum tempor elit. Aenean ac massa ipsum.
            Phasellus malesuada neque erat, at pretium risus mollis nec. Sed dapibus quam a arcu
            fermentum, vitae aliquet felis sodales. Fusce sollicitudin nibh justo, viverra fermentum
            sem maximus sed. Curabitur scelerisque id turpis in elementum. Aenean imperdiet quis
            nunc quis sodales. Maecenas tempus vel ipsum lobortis molestie. Fusce tristique
            consequat lectus, et faucibus nisl condimentum nec. Maecenas venenatis sed ante vitae
            pulvinar. Praesent dolor nibh, semper pellentesque luctus suscipit, posuere scelerisque
            magna.
          </p>
          <br />
          <p>
            Fusce tempor iaculis accumsan. Sed eleifend dui lorem, id imperdiet leo aliquam in.
            Etiam fermentum nisl ante, at ornare erat euismod pulvinar. Etiam ut tellus sed eros
            posuere tempus in porta ipsum. Donec egestas porttitor felis, nec ullamcorper mauris
            congue sit amet. Pellentesque vulputate eget arcu id vehicula. Nunc ut magna ut odio
            egestas suscipit.
          </p>
          <br />
          <br />
          <br />
          <br />

          <Link to="/">
            <Button>Go to home</Button>
          </Link>
        </Container>
      </div>
    )
  }
}

export default PageAbout
