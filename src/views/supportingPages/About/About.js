import React, { useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, CardMedia, CircularProgress } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Container from 'common/Container';
import { Work, Headline, Numbers, Story, Partners, Team, Features } from './components';
import apiService from 'api/apiService'

const About = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await apiService.find('abouts');
                
        // let has_com_headline = res.filter(el => el.article.includes('slogan'));
        // let has_com_about = res.filter(el => el.article.includes('about', 'mission', 'vision', 'strategy'));
        // let has_com_work = res.filter(el => el.article.includes('slogan'));
        // let has_com_service = res.filter(el => el.article.includes('slogan'));
        
        setAbout(res)

        setLoading(false)
    }
    catch(e) {
      console.debug('API content getting error: ' + e)
      setLoading(false)
    }
  }
  
  return (
    <Box>
      <Container bgcolor={'#fff'} position='relative'>
        <Headline items={about} />
        <Numbers />
      </Container>
      <Container bgcolor={'#fff'} paddingY={'0 !important'}>
        <Story items={about} />
        <Container bgcolor={'#fff'}>
          <Divider />
        </Container>
      </Container>
      {/* <Container bgcolor={'#fff'}>
          <Features />
      </Container> */}
      <Container bgcolor={'#fff'}>
          <Work items={about} />
      </Container>
      <Container >
        <Team items={about} />
      </Container>
      <Container>
        <Partners />
      </Container>
    </Box>
  );
};

export default About;
