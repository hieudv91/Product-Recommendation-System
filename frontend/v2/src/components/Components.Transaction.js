import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show,
    SimpleShowLayout, Filter,
    ReferenceField,
    ReferenceInput, AutocompleteInput,
    TopToolbar, ListButton, ShowButton,
    regex, AutocompleteArrayInput,
    ReferenceArrayInput, ChipField,
    ReferenceArrayField, SingleFieldList,
    CreateButton, ExportButton,

} from 'react-admin';
import decodeJwt from 'jwt-decode';
import { ImportButton } from "react-admin-import-csv";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
const validateCode = regex(/^[a-zA-Z0-9]*$/, 'Code must be alphanumberic without space');
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
const VF = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shops" source="shop" reference="shops" link="show" alwaysOn>
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
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
        >
            <Datagrid rowClick="show">
                <TextField source="type" />
                <TextField source="code" />
                <ReferenceArrayField label="Items" source="items" reference="products" >
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField >
                <ReferenceField label="Shop" source="shop" reference="shops">
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

                <ReferenceInput label="Shop" source="shop" reference="shops" link="show">
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <AutocompleteInput source="type" choices={[
                    { id: 'SALES_ORDER', name: 'Order' },
                    { id: 'PRODUCT_VIEWED', name: 'View Product' },
                    { id: 'ADD_TO_CART', name: 'Add to Cart' },
                ]} />
                <TextInput source="code" validate={validateCode} />
                <ReferenceArrayInput reference="products" source="items" label="Items">
                    <AutocompleteArrayInput>
                        <ChipField source="name" />
                    </AutocompleteArrayInput>
                </ReferenceArrayInput>
            </SimpleForm>
        </Create>
    )
};
const VEdit = (props) => (
    <Edit actions={<EA />} {...props}>
        <SimpleForm>
            <AutocompleteInput source="type" choices={[
                { id: 'SALES_ORDER', name: 'Order' },
                { id: 'PRODUCT_VIEWED', name: 'View Product' },
                { id: 'ADD_TO_CART', name: 'Add to Cart' },
            ]} disabled />
            <TextInput source="code" validate={validateCode} disabled />
            <ReferenceArrayInput reference="products" source="items" label="Items">
                <AutocompleteArrayInput>
                    <ChipField source="name" />
                </AutocompleteArrayInput>
            </ReferenceArrayInput>
            <ReferenceInput label="Shop" source="shop" reference="shops" link="show">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
const VShow = (props) => (
    <Show actions={<SA />} {...props}>
        <SimpleShowLayout>
            <TextField source="type" />
            <TextField source="code" />
            <ReferenceArrayField label="Items" source="items" reference="products" >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField >
            <TextField source="description" />
            <ReferenceField label="Shop" source="shop" reference="shops" link="show">
                <ChipField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);
export const L = VList;
export const C = VCreate;
export const E = VEdit;
export const S = VShow;