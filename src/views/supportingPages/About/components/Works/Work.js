import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Box, Typography, Grid, Divider} from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Button from '@material-ui/core/Button';
import WorkImage from 'svg/work.jpg';
import TodoImage from 'svg/todo.jpg';
import lineImage from 'svg/vertical.jpg';
import { _unescape, replaceNewLine } from 'utils/helperFunction'

const Work = ({ items }) => {
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5.5}>
          {
              <Box marginLeft={'10%'}>
                <br />
                <br />
                <br />
                  <Typography
                      variant="h6"
                      color="black"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Дижит платформын зорилго
                  </Typography>
                  <Divider style={{width: "51%", background: "orange"}} />
                  <Divider style={{width: "51%", background: "orange"}} />
                  <Divider style={{width: "51%", background: "orange"}} /> 
                  <br />
                  <Box width={'100%'}>
                    <Typography variant="body2" fontWeight="500" align="justify">
                        {items && items[0] && items[0].platform && replaceNewLine(items[0].platform)}
                    </Typography>
                  </Box>
                  <br />
                  <Box component={Typography} align="center"><img width={300} src={WorkImage} />    </Box>
                </Box>
          }
          
        </Grid>
        <Grid item xs={12} sm={1}>
          <Box marginTop={'80%'}>
            <img height={'80%'} src={lineImage} />    
          </Box>
        </Grid>
        <Grid item xs={12} sm={5.5}>
          <Box>
          <br />
          <br />
          <br />
          <br />
          <img width={'60%'} src={TodoImage} /> 
            <br />
            <br />
            <br />
            {
                  <Box>
                    <br />
                    <br />
                    <br />
                      <Typography
                          variant="h6"
                          color="black"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          Редакцын бодлого
                      </Typography>
                      <Divider style={{width: "30%", background: "orange"}} />
                      <Divider style={{width: "30%", background: "orange"}} />
                      <Divider style={{width: "30%", background: "orange"}} /> 
                      <br />
                      <Box width={'90%'}>
                        <Typography variant="body2" fontWeight="500" align="justify">
                          {items && items[0] && items[0].editor && replaceNewLine(items[0].editor)}
                        </Typography>
                      </Box>
                      <br />
                      <br />
                    </Box>
              }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Work;
