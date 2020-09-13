import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import MyLayout from './components/MyLayout';
import Dashboard from './components/Dashboard';
const Icon = require('./components/Icons')
const RoleComponents = require('./components/Components.Role')
const UserComponents = require('./components/Components.User')

const dataProvider = jsonServerProvider('http://localhost:8080/api');
const App = () => (
    <Admin dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={MyLayout}>
        <Resource name="roles"
            icon={Icon.Accessibility}
            list={RoleComponents.VList}
            create={RoleComponents.VCreate}
            edit={RoleComponents.VEdit}
            show={RoleComponents.VShow} />
        <Resource name="users"
            icon={Icon.User}
            list={UserComponents.VList}
            create={UserComponents.VCreate}
            edit={UserComponents.VEdit}
            show={UserComponents.VShow} />
    </Admin>
);

export default App;