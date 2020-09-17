import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter
} from 'react-admin';
import decodeJwt from 'jwt-decode';

const VFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const VList = (props) => {
    const decodedToken = decodeJwt(localStorage.getItem('accessToken'));
    return (
    <List {...props} filters={<VFilter />} title="List of role" filter={{owner: decodedToken.user.id}}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="price" /> 
            <EditButton />
        </Datagrid>
    </List>
)};
export const VCreate = (props) => {
    const decodedToken = decodeJwt(localStorage.getItem('accessToken'));
    const transform = data => ({
        ...data,
        owner: `${decodedToken.user.id}`
    });
    return (
    <Create {...props} transform={transform}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="price" />
        </SimpleForm>
    </Create>
)};
export const VEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="price" />
        </SimpleForm>
    </Edit>
);
export const VShow = (props) => (    
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="price" />
        </SimpleShowLayout>
    </Show>
);