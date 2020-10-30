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
const SA= ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);
<<<<<<< HEAD

const EditActions = ({ basePath, data }) => (
=======
const EA= ({ basePath, data }) => (
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);
const ShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);
const VList = (props) => (
    <List {...props} filters={<VF/>} title="List of role">
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
<<<<<<< HEAD
    <Edit actions={<EditActions />} {...props}>
=======
    <Edit actions={<EA/>} {...props}>
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
        <SimpleForm>
            <TextInput source="rolename" disabled />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);
<<<<<<< HEAD
const VShow = (props) => (    
    <Show actions={<ShowActions />} {...props}>
=======
const VShow = (props) => (
    <Show actions={<SA/>}{...props}>
>>>>>>> 64d16f675d72c5e6a1c20ba785a8c7554e5d747e
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