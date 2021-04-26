import React from "react";
import { Switch, Route } from "react-router-dom";
import ProgramCatalog from "./components/program-catalog/program-catalog";
import Home from "./Pages/Home";
import pageNotFound from "./Pages/pageNotFound";
import modulesCatalog from "./components/modules-catalog/moduleCatalog";
import CourseStatus from "./components/CourseStatus/CourseStatus.js";
import test from "./Pages/t";
import profile from "./components/profile/profile";
import credits from "./components/credits/credits";

const Routes = () => {
  return (
    <Switch>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route
        key='prorams'
        exact
        path='/program-catalog'
        render={() => <ProgramCatalog layout={true} view='programs' />}></Route>
      <Route
        key='courses'
        exact
        path='/courses-catalog/:programId'
        render={() => <ProgramCatalog layout={true} view='coursess' />}></Route>
      <Route
        exact
        path='/modulesCatalog/:programId/:courseId/:courseInstanceId'
        component={modulesCatalog}></Route>
      <Route exact path='/profile' component={profile}></Route>
      <Route exact path='/credits' component={credits}></Route>
      <Route exact path='/test' component={test}></Route>
      <Route exact path='/CourseStatus' component={CourseStatus}></Route>
      <Route path='*' exact={true} component={pageNotFound} />
    </Switch>
  );
};

export default Routes;
