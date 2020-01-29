import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import store from '../store/store'

import PageHome from './pages/PageHome'
import PageAbout from './pages/PageAbout'
import Page404 from './pages/Page404'
import Modal from './Modal'
import ScrollToTop from './ScrollToTop'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Modal />

        <Router>
          <Route
            render={({ location }) => (
              <ScrollToTop location={location}>
                <TransitionGroup>
                  <CSSTransition
                    key={location.pathname}
                    classNames="slide"
                    timeout={{ enter: 900, exit: 200 }}
                  >
                    <div>
                      <Switch location={location}>
                        <Route exact path="/" component={PageHome} />
                        <Route path="/about" component={PageAbout} />
                        <Route component={Page404} />
                      </Switch>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </ScrollToTop>
            )}
          />
        </Router>
      </Provider>
    )
  }
}

export default App
