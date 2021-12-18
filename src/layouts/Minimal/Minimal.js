import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { Footer } from './components';
import Container from 'common/Container';
import { pages } from '../navigation';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = ({
  children,
}) => {
  return (
    <div>

      <main>
        <Box height={{ xs: 56, sm: 64 }} />
        {children}
        <Divider />
      </main>
      <Box bgcolor={'#343434'}>
        <Container>
          <Footer />
        </Container>
      </Box>
      {/* <Container paddingY={4}>
        <Footer />
      </Container> */}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
};

export default Main;
