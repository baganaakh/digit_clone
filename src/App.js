import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import WithLayout from 'WithLayout'

import {NavigationProvider} from './contexts/navigation'
import NotAuthenticatedContent from './NotAuthenticatedContent'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'aos/dist/aos.css'

import 'scss/react-images.scss'
import 'scss/slick-slider.scss'

// Available layouts
import {Main as MainLayout,} from './layouts'

// Supporting pages
import {About as AboutView} from './views/supportingPages'

const browserHistory = createBrowserHistory()

const App = () => {
  return <NotAuthenticatedContent/>
}

const MainApp = () => {
  //const screenSizeClass = useScreenSizeClass();
  return (

    <Router history={browserHistory}>
      <NavigationProvider>
        <App/>
      </NavigationProvider>
    </Router>
  )
}

export default MainApp
