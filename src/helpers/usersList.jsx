import React from 'react'


const usersList = async function () {
    // async function getUsers() {
    try {
        const authHeader = JSON.parse(localStorage.getItem("authHeader"));
        const data = await fetch(`https://slack-api.replit.app/api/v1/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access-token": authHeader.accessToken,
                "client": authHeader.client,
                "expiry": authHeader.expiry,
                "uid": authHeader.uid
            }
        })

        const res = await data.json();
        localStorage.setItem("usersList", JSON.stringify(res.data))

        return res;
    } catch (error) {
        console.log(error);
    }
    // }
}

export default usersList