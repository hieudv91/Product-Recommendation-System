import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
    ReferenceField,
    ReferenceInput, AutocompleteInput,
    TopToolbar, ListButton, ShowButton, ChipField,
    regex
} from 'react-admin';

let data = {}
export default () => {
    const accessToken = localStorage.getItem('accessToken')
    fetch('http://localhost:8080/api/users/profile',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            },
        })
        .then(response => response.json())
        .then(d => data = d)

    let fakeProps = {
        basePath: "/products",
        hasCreate: false,
        hasEdit: false,
        hasList: true,
        hasShow: false,
        history: {},
        location: { pathname: "/", search: "", hash: "", state: undefined },
        match: { path: "/", url: "/", isExact: true, params: {} },
        options: {},
        permissions: null,
        resource: "products"
    }

    const VF = (props) => (
        <Filter {...props}>
            <TextInput label="Search" source="q" alwaysOn />
            <ReferenceInput label="Shop" source="shop" reference="shops" link="show" alwaysOn>
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </Filter>
    );

    return (
        <Card>
            <CardHeader title={`Welcome ${data.name},`} />
            <CardContent>


                <Button component={Link} to={{ pathname: "/roles" }}>
                    <Card>
                        <CardHeader title={`Role Management`} />
                        <CardContent>
                            8 role(s)
                        </CardContent>
                    </Card>
                </Button>
                <Button component={Link} to={{ pathname: "/roles" }}>
                    <Card>
                        <CardHeader title={`User Management`} />
                        <CardContent>
                            8 user(s)
                        </CardContent>
                    </Card>
                </Button>
                < List {...fakeProps} bulkActionButtons={false} filters={<VF />}>
                    <Datagrid>
                        <TextField source="code" />
                        <TextField source="name" />
                        <TextField source="description" />
                    </Datagrid>
                </List >
            </CardContent>
        </Card>
    )
};