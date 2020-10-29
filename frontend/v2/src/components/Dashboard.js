import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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


                <Button component={Link} to={{ pathname: "/roles" }}>
                    <Card>
                        <CardHeader title={`Role Management`} />
                        <CardContent>
                            8 role(s)
                        </CardContent>
                    </Card>
                </Button>
                <Button component={Link} to={{ pathname: "/roles" }}>
                    <Card>
                        <CardHeader title={`User Management`} />
                        <CardContent>
                            8 user(s)
                        </CardContent>
                    </Card>
                </Button>
            </CardContent>
        </Card>
    )
};