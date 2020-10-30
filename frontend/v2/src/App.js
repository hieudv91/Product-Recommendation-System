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
const Role = <Resource name="roles" icon={Icon.Role} list={R.L} create={R.C} edit={R.E} show={R.S} />
const User = <Resource name="users" icon={Icon.User} list={U.L} create={U.C} edit={U.E} show={U.S} />
const App = () => (

    <Admin dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={MyLayout}>
        {permissions =>
                permissions === 'admin' ? [Role, User] :
                    permissions === 'customer' ? [Role, User]
                        : null
        }
    </Admin>
);

export default App;