import * as React from "react";
import { useQuery, Loading, Error } from 'react-admin';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import decodeJwt from 'jwt-decode';

export default () => {
    const accessToken = localStorage.getItem('accessToken')
    const decodedToken = decodeJwt(accessToken);
    console.log(decodedToken)
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'users',
        payload: { id:  decodedToken.user.id }
    });

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;

    return (
        <Card>
            <CardHeader title="Welcome to Recommendation System" />
            <CardContent> <ul>
                <li>Name: {data.username}</li>
                <li>Role: {data.role}</li>
            </ul></CardContent>
        </Card>
    )
};