import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
    ReferenceField, SelectInput,
    ReferenceInput, AutocompleteInput,
    PasswordInput
} from 'react-admin';

const VFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const VList = (props) => (
    <List {...props} filters={<VFilter />} title="List of users">
        <Datagrid rowClick="show">
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="fullname" />
            <ReferenceField label="Role" source="role" reference="roles" link="show">
                <TextField source="description" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);
const VListA = (props) => (
    <List {...props} filters={<VFilter />} title="List of users">
        <Datagrid rowClick="show">
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="fullname" />
            <ReferenceField label="Role" source="role">
                <TextField source="description" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);
const VCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <PasswordInput source="password" />
            <TextInput source="fullname" />
            <ReferenceInput label="Role" source="role" reference="roles" link="show">
                <AutocompleteInput  optionText="rolename" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
const VEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="password" />
            <TextInput source="fullname" />
            <ReferenceInput label="Role" source="role" reference="roles" link="show">
                <AutocompleteInput  optionText="rolename" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
const VShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="fullname" />
            <ReferenceField label="Role" source="role" reference="roles" link="show">
                <TextField source="description" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const L = VList;
export const C = VCreate;
export const E = VEdit;
export const S = VShow;