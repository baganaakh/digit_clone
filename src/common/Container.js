import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const Container = ({ children, ...rest }) => (
  <Box
    maxWidth={{ sm: 800, md: 1436 }}
    width={'100%'}
    margin={'0 auto'}
    paddingX={2}
    paddingY={2}
    bgcolor={'#f8f9fc'}
    // paddingY={{ xs: 2, sm: 4, md: 4 }}
    {...rest}
  >
    {children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
