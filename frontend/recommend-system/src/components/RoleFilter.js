import * as React from "react";
import { Filter, TextInput } from 'react-admin';

const RoleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Description" source="description" defaultValue="Hello, World!" />
    </Filter>
);
export default RoleFilter