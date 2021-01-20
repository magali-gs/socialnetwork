import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration.js";
import Login from "./login.js";
import ResetPassword from "./reset.js";

export default function Welcome() {
    return (
        <>
            <HashRouter>
                <div className='welcome'>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </>
    );
}