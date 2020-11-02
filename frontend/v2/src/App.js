import * as React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import MyLayout from './components/MyLayout';
import Dashboard from './components/Dashboard';

const Icon = require('./components/Icons')
const R = require('./components/Components.Role')
const U = require('./components/Components.User')
const S = require('./components/Components.Shop')
const P = require('./components/Components.Product')
const T = require('./components/Components.Transaction')


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
const Shop = <Resource name="shops" icon={Icon.Shop} list={S.L} create={S.C} edit={S.E} show={S.S} />
const Product = <Resource name="products" icon={Icon.Product} list={P.L} create={P.C} edit={P.E} show={P.S} />
const Transaction = <Resource name="transactions" icon={Icon.Transaction} list={T.L} create={T.C} edit={T.E} show={T.S} />
const App = () => (

    <Admin dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={MyLayout}>
        {permissions =>
                permissions === 'admin' ? [Role, User] :
                    permissions === 'customer' ? [Shop, Product, Transaction]
                        : null
        }
    </Admin>
);

export default App;