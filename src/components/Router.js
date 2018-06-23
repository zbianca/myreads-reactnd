import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Search from './Search'
import NotFound from './NotFound'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router