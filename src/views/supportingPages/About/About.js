import React, {useEffect, useState} from 'react'
import {useTheme} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Container from 'common/Container'
import {Headline, Numbers, Partners, Story, Team, Work} from './components'
import apiService from 'api/apiService'
import {AppBar, Slide, useScrollTrigger,Box} from '@mui/material'
import Timer from './components/Countdown/Timer'

const About = () => {
  const theme = useTheme()
  const [isLoading, setLoading] = useState(true)
  const [about, setAbout] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    getData()
  }, [])

  const getData = async () => {
    try {
      let res = await apiService.find('abouts')

      // let has_com_headline = res.filter(el => el.article.includes('slogan'));
      // let has_com_about = res.filter(el => el.article.includes('about', 'mission', 'vision', 'strategy'));
      // let has_com_work = res.filter(el => el.article.includes('slogan'));
      // let has_com_service = res.filter(el => el.article.includes('slogan'));

      setAbout(res)

      setLoading(false)
    } catch (e) {
      console.debug('API content getting error: ' + e)
      setLoading(false)
    }
  }

  const HideOnScroll = ({children}) => {
    const trigger = useScrollTrigger()

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    )
  }

  return (
    <Box>
      <HideOnScroll>
          <AppBar
            position={'fixed'}
            sx={{
              backgroundColor: '#041b37',
              // backgroundColor: theme.palette.background.paper,
            }}
            elevation={1}
          >
        <Container bgcolor={'#041b37'} paddingY={{xs: 1 / 2, sm: 1}}>
            <Timer/>
        </Container>
          </AppBar>
      </HideOnScroll>
      <Container
        // bgcolor={'#f8f9fc'}
        position="relative"
      >
        <Box height={{xs: 56, sm: 64}}/>
        <Headline/>
        <Numbers/>
      </Container>
      <Container bgcolor={'#fff'} paddingY={'0 !important'}>
        <Story items={about}/>
        <Container bgcolor={'#fff'}>
          <Divider/>
        </Container>
      </Container>
      {/* <Container bgcolor={'#fff'}>
          <Features />
      </Container> */}
      <Container bgcolor={'#fff'}>
        <Work items={about}/>
      </Container>
      <Container>
        <Team items={about}/>
      </Container>
      <Container>
        <Partners/>
      </Container>
    </Box>
  )
}

export default About
