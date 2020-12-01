import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';

let data = {}
export default () => {
    const accessToken = localStorage.getItem('accessToken')
    fetch('http://localhost:8080/api/users/profile',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            },
        })
        .then(response => response.json())
        .then(d => data = d)

    return (
        <Card>
            <CardHeader title={`Welcome ${data.name},`} />
            <CardContent>


            </CardContent>
        </Card>
    )
};