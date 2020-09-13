import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter
} from 'react-admin';

const VFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const VList = (props) => (
    <List {...props} filters={<VFilter />} title="List of role">
        <Datagrid rowClick="show">
            <TextField source="rolename" />
            <TextField source="description" /> 
            <EditButton />
        </Datagrid>
    </List>
);
export const VCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="rolename" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
export const VEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="rolename" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);
export const VShow = (props) => (    
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="rolename" />
            <TextField source="description" />
        </SimpleShowLayout>
    </Show>
);