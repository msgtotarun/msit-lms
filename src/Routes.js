<<<<<<< HEAD
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProgramCatalog from './components/program-catalog/program-catalog'
import moduleCatalog from './components/moduleCatalog/moduleCatalog'
import Home from './Pages/Home'
import pageNotFound from './Pages/pageNotFound'
import test from './Pages/t'
||||||| merged common ancestors
import React from "react";
import { Switch, Route } from "react-router-dom";
import ProgramCatalog from "./components/program-catalog/program-catalog";
import Home from "./Pages/Home";
import pageNotFound from "./Pages/pageNotFound";
import test from "./Pages/t";
=======
import React from "react";
import { Switch, Route } from "react-router-dom";
import ProgramCatalog from "./components/program-catalog/program-catalog";
import Home from "./Pages/Home";
import pageNotFound from "./Pages/pageNotFound";
import modulesCatalog from "./components/modules-catalog/modules-catalog";
import test from "./Pages/t";
>>>>>>> 0d120d6ac387e509e619ca42114898292e9ec27d

const Routes = () => {
  return (
    <Switch>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
<<<<<<< HEAD
      <Route key="programs" exact path='/program-catalog' render={() => <ProgramCatalog layout={true} view="programs"/>}></Route>
      <Route key="courses" exact path='/courses-catalog' render={() => <ProgramCatalog layout={true} view="coursess"/>}></Route>
      <Route exact path='/module-catalog/:courseId' component={moduleCatalog}></Route>
||||||| merged common ancestors
      <Route
        key='prorams'
        exact
        path='/program-catalog'
        render={() => <ProgramCatalog layout={true} view='programs' />}></Route>
      <Route
        key='courses'
        exact
        path='/courses-catalog'
        render={() => <ProgramCatalog layout={true} view='coursess' />}></Route>
=======
      <Route
        key='prorams'
        exact
        path='/program-catalog'
        render={() => <ProgramCatalog layout={true} view='programs' />}></Route>
      <Route
        key='courses'
        exact
        path='/courses-catalog'
        render={() => <ProgramCatalog layout={true} view='coursess' />}></Route>
      <Route
        exact
        path='/modules-catalog/:courseId'
        component={modulesCatalog}></Route>
>>>>>>> 0d120d6ac387e509e619ca42114898292e9ec27d
      <Route exact path='/test' component={test}></Route>
      <Route path='*' exact={true} component={pageNotFound} />
    </Switch>
  );
};

export default Routes;
