import * as React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import MyLayout from './components/MyLayout';
import Dashboard from './components/Dashboard';
const Icon = require('./components/Icons')
const RoleComponents = require('./components/Components.Role')
const UserComponents = require('./components/Components.User')
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
const App = () => (

    <Admin dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        layout={MyLayout}>
        {permissions =>
            permissions === 'admin' ?
                [
                    <Resource name="roles"
                        icon={Icon.Accessibility}
                        list={RoleComponents.VList}
                        create={RoleComponents.VCreate}
                        edit={RoleComponents.VEdit}
                        show={RoleComponents.VShow} />,
                    <Resource name="users"
                        icon={Icon.User}
                        list={UserComponents.VList}
                        create={UserComponents.VCreate}
                        edit={UserComponents.VEdit}
                        show={UserComponents.VShow} />,
                    <Resource name="products"
                        icon={Icon.User}
                        list={ProductComponents.VList}
                        create={ProductComponents.VCreate}
                        edit={ProductComponents.VEdit}
                        show={ProductComponents.VShow} />
                ] : [
                    <Resource name="shops"
                        icon={Icon.User}
                        list={ShopComponents.VList}
                        create={ShopComponents.VCreate}
                        edit={ShopComponents.VEdit}
                        show={ShopComponents.VShow} />,
                    <Resource name="products"
                        icon={Icon.User}
                        list={ProductComponents.VList}
                        create={ProductComponents.VCreate}
                        edit={ProductComponents.VEdit}
                        show={ProductComponents.VShow} />
                ]
        }
    </Admin>
);

export default App;