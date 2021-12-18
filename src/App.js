import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'aos/dist/aos.css'
import 'scss/react-images.scss'
import 'scss/slick-slider.scss'

// Available layouts
import WithLayout from 'WithLayout'
import {Main as MainLayout,} from './layouts'

// Supporting pages
import {About as AboutView} from './views/supportingPages'


const MainApp = () => {
  return (
    <WithLayout
      component={AboutView}
      layout={MainLayout}
    />
  )
}

export default MainApp
