import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import MainCard from 'ui-component/cards/MainCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';

class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { modelName, title, routeUrl } = this.props || ''

    return (
      <MainCard>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <IconButton
                  color="secondary"
                  onClick={() => this.props.history.goBack()}
                  size={'small'}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                  color="secondary"
                  onClick={() => this.props.history.push('/' + routeUrl)}
                  size={'small'}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  {title}
              </Typography>
            </Grid>
        </Grid>
      </MainCard>
    );
  }
}

export default withRouter(ToolbarComponent)