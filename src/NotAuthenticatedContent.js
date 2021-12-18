import React, {lazy} from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import WithLayout from 'WithLayout'
// Available layouts
import {Main as MainLayout,} from 'layouts'

// Landing pages
// import {Home as HomeView} from 'views/landingPages';
// Supporting pages
import {About as AboutView} from './views/supportingPages'


export default function NotAuthenticatedContentComp() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={AboutView}
            layout={MainLayout}
          />
        )}
      />

      <Redirect to={'/login'}/>
    </Switch>
  )
}
