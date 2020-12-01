import * as React from "react";
import {
    List, Datagrid, TextField,
    Create, SimpleForm, TextInput,
    Edit, EditButton, Show, Filter,
    ReferenceField,
    ReferenceInput, AutocompleteInput,
    TopToolbar, ListButton, ShowButton,
    regex, AutocompleteArrayInput,
    ReferenceArrayInput, ChipField,
    TabbedShowLayout
} from 'react-admin';
import decodeJwt from 'jwt-decode';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
const validateCode = regex(/^[a-zA-Z0-9]*$/, 'Code must be alphanumberic without space');

const VF = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Shops" source="shop" reference="shops" link="show" alwaysOn>
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Product" source="source" reference="products" link="show" alwaysOn>
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
        <List {...props} filters={<VF />} title="List of role" filter={{ owner: decodedToken.user.id }} sort={{ field: 'value', order: 'DESC' }}>
            <Datagrid rowClick="show" >
                <ReferenceField label="Shop" source="shop" reference="shops">
                    <ChipField source="name" />
                </ReferenceField>
                <ReferenceField label="Source Product" source="source" reference="products">
                    <ChipField source="name" />
                </ReferenceField>
                <ReferenceField label="Target Product" source="target" reference="products">
                    <ChipField source="name" />
                </ReferenceField>
                <TextField source="value" />
            
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
                    { id: 'BOUGHT_TOGETHER', name: 'Often bought together' },
                    { id: 'VIEW_TOGETHER', name: 'Often view together' },
                ]} />
                <ReferenceInput label="Shop" source="shop" reference="shops" link="show">
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <TextInput source="code" validate={validateCode} />
                <AutocompleteInput source="status" choices={[
                    { id: 'ACTIVE', name: 'Active' },
                    { id: 'DEACTIVE', name: 'Deactive' },
                ]} />
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
    </Edit>
);
const VShow = (props) => (
    <Show actions={<SA />} {...props}>
        <TabbedShowLayout>
            
        </TabbedShowLayout>
    </Show>
);
export const L = VList;
export const C = VCreate;
export const E = VEdit;
export const S = VShow;