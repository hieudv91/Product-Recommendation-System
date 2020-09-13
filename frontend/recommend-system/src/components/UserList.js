import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';
import UserFilter from "./UserFilter";

 const UserList = (props) => (
    <List {...props} filters={<UserFilter/>}>
        <Datagrid>
            <TextField source="username" />
            <TextField source="fullname" />
            <TextField source="createdAt" />
        </Datagrid>
    </List>
);
export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <RichTextInput source="body" />
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export default { UserList, }