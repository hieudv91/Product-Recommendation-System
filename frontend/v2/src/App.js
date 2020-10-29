import * as React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import MyLayout from './components/MyLayout';
import Dashboard from './components/Dashboard';
const Icon = require('./components/Icons')
const R = require('./components/Components.Role')
const U = require('./components/Components.User')
const ProductComponents = require('./components/Components.Product')
const ShopComponents = require('./components/Components.Shop')

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('Authorization', localStorage.getItem('accessToken'));
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider('http://localhost:8080/api', httpClient);
const Role = <Resource name="roles" icon={Icon.Accessibility} list={R.VList} create={R.VCreate} edit={R.VEdit} show={R.VShow} />
const RoleA = <Resource name="roles" />
const User = <Resource name="users" icon={Icon.User} list={U.VList} create={U.VCreate} edit={U.VEdit} show={U.VShow} />
const App = () => (

    <Admin dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={MyLayout}>
        {permissions =>
            permissions === 'sysadm' ? [Role] :
                permissions === 'admin' ? [User, RoleA] :
                    permissions === 'customer' ? [Role, User]
                        : null
        }
    </Admin>
);

export default App;