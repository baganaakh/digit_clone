import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {getUser} from 'api/auth';

import WithLayout from 'WithLayout';
import {Main as MainLayout,} from 'layouts';

// handle the private routes
function PrivateRoute({ component, ...rest }) {
  return (
      <Switch>
        <Route
          {...rest}
          render={(matchProps) => getUser()
            ?
            // <Component {...matchProps} />
            <WithLayout
              {...matchProps}
              component={component}
              layout={MainLayout}
            />
            :
            <Redirect to={{ pathname: '/login', state: { from: matchProps.location } }} />}
        />
      </Switch>
  )
}

export default PrivateRoute;
