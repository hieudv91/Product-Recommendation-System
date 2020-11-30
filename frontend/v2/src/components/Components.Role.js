import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
    TopToolbar, ListButton, ShowButton
} from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const VF = (props) => (<Filter {...props}><TextInput label="Search" source="q" alwaysOn /></Filter>);
const SA = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);
const EA = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);
const VList = (props) => (
    <List {...props} filters={<VF />} title="List of role">
        <Datagrid rowClick="show">
            <TextField source="rolename" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);
const VCreate = (props) => (
    <Create {...props}>
        <SimpleForm >
            <TextInput source="rolename" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
const VEdit = (props) => (
    <Edit actions={<EA />} {...props}>
        <SimpleForm>
            <TextInput source="rolename" disabled />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);
const VShow = (props) => (
    <Show actions={<SA />}{...props}>
        <SimpleShowLayout>
            <TextField source="rolename" />
            <TextField source="description" />
        </SimpleShowLayout>
    </Show>
);

export const L = VList;
export const C = VCreate;
export const E = VEdit;
export const S = VShow;