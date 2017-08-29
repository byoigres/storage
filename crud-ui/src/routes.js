import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import MainLayout from './containers/Layout/MainLayout';
import ListUsers from './containers/User/ListUsers';
import AddUser from './containers/User/AddUser';
import ListComments from './containers/Comments/ListComments';
import AddComment from './containers/Comments/AddComment';
import EditComment from './containers/Comments/EditComment';
import EditUser from './containers/User/EditUser';

export default (
  <Switch>
    <MainLayout>
      <Route exact path="/" component={ListUsers} />
      <Route exact path="/usuarios" component={ListUsers} />
      <Route exact path="/usuarios/agregar" component={AddUser} />
      <Route exact path="/usuarios/:userId/comentarios" component={ListComments} />
      <Route exact path="/usuarios/:userId/editar" component={EditUser} />
      <Route exact path="/usuarios/:userId/comentarios/agregar" component={AddComment} />
      <Route exact path="/usuarios/:userId/comentarios/:commentId/editar" component={EditComment} />
    </MainLayout>
    <Route component={() => <h1>Not Match</h1>} />
  </Switch>
);
