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
    ReferenceArrayInput, SelectArrayInput, ChipField,
    ReferenceManyField, SingleFieldList

} from 'react-admin';
import decodeJwt from 'jwt-decode';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
const validateCode = regex(/^[a-zA-Z0-9]*$/, 'Code must be alphanumberic without space');
const VF = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Shop" source="shop" reference="shops" link="show" alwaysOn>
            <AutocompleteInput optionText="shopname" />
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
        <List {...props} filters={<VF />} title="List of role" filter={{ owner: decodedToken.user.id }}>
            <Datagrid rowClick="show">
                <TextField source="type" />
                <TextField source="person" />
                <TextField source="code" />
                <ReferenceManyField label="Items" source="item" reference="products" target="id">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceManyField>
                <ReferenceField label="Shop" source="shop" reference="shops" link="show">
                    <TextField source="name" />
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
                <AutocompleteInput source="type" choices={[
                    { id: 'SALES_ORDER', name: 'Order' },
                    { id: 'PRODUCT_VIEWED', name: 'View Product' },
                    { id: 'ADD_TO_CART', name: 'Add to Cart' },
                ]} />
                <TextInput source="code" validate={validateCode} />
                <TextInput source="person" />
                <ReferenceArrayInput reference="products" source="items" label="Items">
                    <AutocompleteArrayInput>
                        <ChipField source="name" />
                    </AutocompleteArrayInput>
                </ReferenceArrayInput>
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