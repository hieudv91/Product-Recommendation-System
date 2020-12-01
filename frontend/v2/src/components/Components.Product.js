import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
    ReferenceField,
    ReferenceInput, AutocompleteInput,
    TopToolbar, ListButton, ShowButton, ChipField,
    CreateButton, ExportButton,
    regex, downloadCSV
} from 'react-admin';
import { ImportButton } from "react-admin-import-csv";
import decodeJwt from 'jwt-decode';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import jsonExport from 'jsonexport/dist';

const validateCode = regex(/^[a-zA-Z0-9]*$/, 'Code must be alphanumberic without space');

const exporter = products => {
    const productsForExport = products.map(product => {
        const { code, name, description, shop, owner} = product;
        return { code, name, description, shop, owner };
    });
    jsonExport(productsForExport, {
        headers: ['code', 'name', 'description', 'shop', 'owner'] // order fields in the export
    }, (err, csv) => {
        downloadCSV(csv, 'products'); // download as 'posts.csv` file
    });
};
const VF = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop" reference="shops" link="show" alwaysOn>
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
const LA = props => {
    const { className, basePath } = props;
    return (
        <TopToolbar className={className}>
            <CreateButton basePath={basePath} />
            <ExportButton basePath={basePath} />
            <ImportButton {...props} />
        </TopToolbar>
    );
};
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
const VList = (props) => {
    const decodedToken = decodeJwt(localStorage.getItem('accessToken'));
    return (
        <List {...props} filters={<VF />}
            title="List of role"
            filter={{ owner: decodedToken.user.id }} 
            actions={<LA />}
            exporter={exporter}>
            <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="code" />
                <TextField source="name" />
                <TextField source="description" />
                <ReferenceField label="Shop" source="shop" reference="shops" link="show">
                    <ChipField source="name" />
                </ReferenceField>
                <EditButton />
            </Datagrid>
        </List>
    )
};
const VCreate = (props) => {
    const decodedToken = decodeJwt(localStorage.getItem('accessToken'));
    const transform = data => ({
        ...data,
        owner: `${decodedToken.user.id}`
    });
    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <TextInput source="code" validate={validateCode} />
                <TextInput source="name" />
                <TextInput source="description" />
                <ReferenceInput label="Shop" source="shop" reference="shops" link="show">
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
};
const VEdit = (props) => (
    <Edit actions={<EA />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="code" disabled />
            <TextInput source="name" />
            <TextInput source="description" />
            <ReferenceInput label="Shop" source="shop" reference="shops" link="show">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
const VShow = (props) => (
    <Show actions={<SA />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField label="Shop" source="shop" reference="shops" link="show">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);
export const L = VList;
export const C = VCreate;
export const E = VEdit;
export const S = VShow;