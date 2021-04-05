import React from "react";
import {loginUrl} from "./spotify";


export const Login = () => {
    return(
        <div>
            <h1>Login Stuff Here</h1>
            <a href={loginUrl}>Log In To Spotify</a>
        </div>
    )
}