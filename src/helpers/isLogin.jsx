import { stateLs } from "./stateLS";
import { useNavigate } from "react-router";

import React from 'react'

const isLogin = () => {
    const navigate = useNavigate();
    const authHeader = JSON.parse(localStorage.getItem("authHeader"));
    // console.log('authHeader')
    // console.log(authHeader)
    if (!authHeader || authHeader === undefined || authHeader === null) {
        navigate("/login");
    }
}

export default isLogin