import React from 'react'
// import userMessages from './userMessages';
import api from './api';


const sendMessage = async function (receiver_id, message_body, receiver_class) {
    // async function getUsers() {
    try {
        const body = {
            receiver_id: receiver_id,
            receiver_class: receiver_class,
            body: message_body

        }

        const authHeader = JSON.parse(localStorage.getItem("authHeader"));
        // console.log(`https://slack-api.replit.app/api/v1/messages?receiver_id=${receiver_id}&receiver_class=User`)
        const data = await fetch(`https://slack-api.replit.app/api/v1/messages`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "access-token": authHeader.accessToken,
                "client": authHeader.client,
                "expiry": authHeader.expiry,
                "uid": authHeader.uid
            }
        })

        const res = await data.json();
        console.log(res.data)


        let name = "";
        if (receiver_class === "User") {
            name = "userMessages";
        } else {
            name = "channelMessages";
        }
        api(name, receiver_id, 0, "");

        return res;
    } catch (error) {
        console.log(error);
    }

}

export default sendMessage