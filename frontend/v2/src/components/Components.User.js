import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
<<<<<<< HEAD
    ReferenceField, SelectInput,
    ReferenceInput, AutocompleteInput,
    PasswordInput
=======
    ReferenceField,
    ReferenceInput, AutocompleteInput,
    TopToolbar, ListButton, ShowButton
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
} from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const VF = (props) => (<Filter {...props}><TextInput label="Search" source="q" alwaysOn /></Filter>);
const SA = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);
<<<<<<< HEAD

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
=======
const EA = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);
const VList = (props) => (
    <List {...props} filters={<VF />} title="List of users">
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
        <Datagrid rowClick="show">
            <TextField source="username" />
            <TextField source="fullname" />
            <ReferenceField label="Role" source="role" reference="roles" link="show">
                <TextField source="description" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);
<<<<<<< HEAD
=======

>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
const VCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <PasswordInput source="password" />
            <TextInput source="fullname" />
            <ReferenceInput label="Role" source="role" reference="roles" link="show">
                <AutocompleteInput optionText="rolename" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
const VEdit = (props) => (
<<<<<<< HEAD
    <Edit {...props}>
=======
    <Edit actions={<EA />}  {...props}>
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
        <SimpleForm>
            <TextInput source="username" disabled />
            <TextInput source="password" />
            <TextInput source="fullname" />
            <ReferenceInput label="Role" source="role" reference="roles" link="show">
                <AutocompleteInput optionText="rolename" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
const VShow = (props) => (
<<<<<<< HEAD
    <Show {...props}>
=======
    <Show actions={<SA />} {...props}>
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
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