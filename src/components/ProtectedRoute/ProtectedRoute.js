import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({component: Component, ...props}) => {
    return (
        <>
            {props.isChecking ? (
                <Preloader/>
            ) : (
              <Route>{props.loggedIn ? <Component {...props}/> : <Redirect to="./"/>}</Route>
            )}

        </>
    );
};

export default ProtectedRoute;