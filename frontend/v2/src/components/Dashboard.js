import * as React from "react";
import { useState } from 'react';
import { useQuery, Loading, Error, useNotify, useRedirect, fetchStart, fetchEnd, } from 'react-admin';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import decodeJwt from 'jwt-decode';
import { useDispatch } from 'react-redux';

export default () => {
    const accessToken = localStorage.getItem('accessToken')
    const decodedToken = decodeJwt(accessToken);
    const { data, loading, error } = useQuery({
        type: 'profile',
        resource: 'users',
        payload: { id: decodedToken.user.id }
    });

    setLoading(true);
    dispatch(fetchStart()); // start the global loading indicator 
    const updatedRecord = { ...record, is_approved: true };
    fetch(`/comments/${record.id}`, { method: 'PUT', body: updatedRecord })
        .then(() => {
            notify('Comment approved');
            redirect('/comments');
        })
        .catch((e) => {
            notify('Error: comment not approved', 'warning')
        })
        .finally(() => {
            setLoading(false);
            dispatch(fetchEnd()); // stop the global loading indicator
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