
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProgramCatalog from './components/program-catalog/program-catalog'
import Home from './Pages/Home'
import pageNotFound from './Pages/pageNotFound'
import test from './Pages/t'

const Routes = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route key="prorams" exact path='/program-catalog' render={() => <ProgramCatalog layout={true} view="programs"/>}></Route>
      <Route key="courses" exact path='/courses-catalog' render={() => <ProgramCatalog layout={true} view="coursess"/>}></Route>
      <Route exact path='/test' component={test}></Route>
      <Route path='*' exact={true} component={pageNotFound} />
    </Switch>
  );
}

export default Routes;
