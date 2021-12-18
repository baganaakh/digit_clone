/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TeamWorkingIllustration from 'svg/illustrations/TeamWorking';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardMedia from '@material-ui/core/CardMedia';
import ReactPlayer from 'react-player'


const Features = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>        
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          height={450}
        >
          <Box                
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="#060f42"
          >
            <Typography
                variant={'h3'}                  
                component="h1"
            >
                Манай хамт олон
            </Typography>
          </Box>  
          <Box component={Card} boxShadow={4} height={'100%'} width={'100%'}>
            {/* <Box
              component={CardMedia}
              height={'100%'}
              width={'100%'}
              minHeight={300}              
              image="https://assets.maccarianagency.com/backgrounds/img20.jpg"
            /> */}              
            {/* <video controls='true' height='100%' width='auto' autoPlay>
              <source src={myVideo} type="video/mp4" />                         
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                  >supports HTML5 video</a
                >
              </p>                      
            </video> */}
              <ReactPlayer height='100%' width='100%' url='https://www.youtube.com/watch?v=YhBNhSf8ay8' playing />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
