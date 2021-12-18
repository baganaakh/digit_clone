import React from 'react'
import PropTypes from 'prop-types'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import {Footer} from './components'
import Container from 'common/Container'
//import { pages } from '../navigation';


const HideOnScroll = ({children}) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
}

const Main = ({
                children,
                setThemePalette,
              }) => {
  return (
    <div>
      <Container padding={0} bgcolor={'#fff'}>
        <main>
          <Box height={{xs: 56, sm: 64}}/>
          {children}
        </main>
      </Container>
      <Container padding={0}>
        <Footer setThemePalette={setThemePalette}/>
      </Container>
      {/* <Container paddingY={4}>
        <Footer />
      </Container> */}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
}

export default Main
