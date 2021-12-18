import React from 'react';
import { alpha, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TeamWorkingIllustration from 'svg/illustrations/TeamWorking';
import { CardContent, Card, CardMedia, Avatar, Grid, Typography, CardHeader } from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';

import {FaAtom, FaLightbulb, FaCog} from 'react-icons/fa'

const Story = ({ items }) => {
  const theme = useTheme();
  const assetAPIURL = 'https://api.digit.mn'
  return (
    <Box>
        {
            <Box marginBottom={4}>
              <Box
                component={Typography}
                fontWeight={700}
                variant={'h6'}
                gutterBottom
                align={'center'}
              >
                {items && items[0] && items[0].name}
              </Box>
              <Typography
                variant={'body2'}
                component={'p'}
                color={'textSecondary'}
                align={'center'}
                justifyContent={'center'}
                paddingLeft={'10%'}
                width={'90%'}
              >
                {items && items[0] && items[0].descr}
              </Typography>
            </Box>
        }
      <Grid container spacing={2}>
        <Grid item xs bgcolor="#f8f5f5" marginLeft={'3%'} marginRight={'3%'} marginBottom={8}>
        <Box
            component={Avatar}                    
            variant="square"
            width={60}
            height={60}
            marginLeft={20}
            bgcolor={alpha(theme.palette.primary.main, 0.3)}  
            style={{backgroundSize: '100% 100%'}}                                                            
        ><FaCog size="large" /></Box>
        {
            <CardContent>            
              <Typography variant="subtitle1" gutterBottom fontWeight="700" align="center">
                  Алсын хараа
              </Typography>
              <Typography variant="body2" fontWeight="500" align="justify">
                {items && items[0] && items[0].vision}
              </Typography>
            </CardContent>
        }
        </Grid>
        <Grid item xs bgcolor="#f8f5f5" marginTop={10} marginLeft={'3%'} marginRight={'3%'}>
        <Box
            component={Avatar}                    
            variant="square"
            width={60}
            height={60}
            marginLeft={20}
            bgcolor={alpha(theme.palette.primary.dark, 0.3)}       
            style={{backgroundSize: '100% 100%'}}                                                       
        ><FaAtom size="large" /></Box>
        {
            <CardContent>            
              <Typography variant="subtitle1" gutterBottom fontWeight="700" align="center">
                Эрхэм зорилго
              </Typography>
              <Typography variant="body2" fontWeight="500" align="justify">
                {items && items[0] && items[0].mission}
              </Typography>
            </CardContent>
        }
        </Grid>
        <Grid paddingTop={2} item xs bgcolor="#f8f5f5" marginLeft={3} marginRight={3} marginBottom={8}>
        <Box
            component={Avatar}                    
            variant="square"
            width={60}
            height={60}
            marginLeft={20}
            bgcolor={alpha(theme.palette.secondary.main, 0.3)}                                                              
        ><FaLightbulb size="large" /></Box>
          {
            <CardContent>            
              <Typography variant="subtitle1" gutterBottom fontWeight="700" align="center">
                Стратеги
              </Typography>
              <Typography variant="body2" fontWeight="500" align="justify">
              {items && items[0] && items[0].strategy}
              </Typography>
            </CardContent>
        }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Story;
