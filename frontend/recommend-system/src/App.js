
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import './App.css';

import authProvider from './authProvider';
import MyLayout from './components/MyLayout';
import Dashboard from './components/Dashboard';
import RoleList from './components/RoleList'

import resthapida from './dataProvider'
import UserList from './components/UserList';

const dataProvider = resthapida('http://localhost:8080');


const App = () => (
  <Admin dashboard={Dashboard}
    //authProvider={authProvider}
    dataProvider={dataProvider}
    layout={MyLayout}>


    {permissions => [
      <Resource name="role" list={RoleList} />,
      // Only include the categories resource for admin users
      
      <Resource name="user" list={UserList} />
        ,
    ]}
  </Admin>
);
export default App;

