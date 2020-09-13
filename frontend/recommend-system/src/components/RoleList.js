import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';
import RoleFilter from './RoleFilter'

 const RoleList = (props) => (
    <List {...props} filters={<RoleFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="createdAt" />
        </Datagrid>
    </List>
);

export default RoleList