import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useSelector(state => state)
    return (
        <Route {...rest} render={props => {
            if (auth.token)
                return (<Component {...props} />)
            else return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }} />
    )

}

