import React from 'react'
import isLogin from './isLogin';

const api = async function (api_name, receiver_id, channel_id, message_body) {
    // isLogin()

    const url = "https://slack-api.replit.app";
    const authHeader = JSON.parse(localStorage.getItem("authHeader"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    const headers = {
        "Content-Type": "application/json",
        "access-token": authHeader.accessToken,
        "client": authHeader.client,
        "expiry": authHeader.expiry,
        "uid": authHeader.uid
    }



    if (api_name === "channelDetails") {
        try {


            console.log(`${url}/api/v1/channels/${receiver_id}`)
            const data = await fetch(`${url}/api/v1/channels/${receiver_id}`, {
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
            localStorage.setItem("channelDetails", JSON.stringify(res.data))
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    if (api_name === "channelMessages") {
        try {

            // const authHeader = JSON.parse(localStorage.getItem("authHeader"));
            // console.log(`https://slack-api.replit.app/api/v1/channels/${receiver_id}`)
            const data = await fetch(`${url}/api/v1/messages?receiver_id=${receiver_id}&receiver_class=Channel`, {
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
            localStorage.setItem("channelMessages", JSON.stringify(res.data))
            return res;
        } catch (error) {
            console.log(error);
        }
    }



    if (api_name === "userMessages") {
        try {

            // const authHeader = JSON.parse(localStorage.getItem("authHeader"));
            // console.log(`https://slack-api.replit.app/api/v1/messages?receiver_id=${receiver_id}&receiver_class=User`)
            const data = await fetch(`${url}/api/v1/messages?receiver_id=${receiver_id}&receiver_class=User`, {
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
            localStorage.setItem("userMessages", JSON.stringify(res.data))
            return res;
        } catch (error) {
            console.log(error);
        }



    }
    if (api_name === "userChannels") {
        try {

            // const authHeader = JSON.parse(localStorage.getItem("authHeader"));

            const data = await fetch(`${url}/api/v1/channels`, {
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
            console.log(res.data)
            localStorage.setItem("userChannels", JSON.stringify(res.data))

            return res;
        } catch (error) {
            console.log(error);
        }
    }

    if (api_name === "usersList") {
        try {
            // const authHeader = JSON.parse(localStorage.getItem("authHeader"));
            const data = await fetch(`${url}/api/v1/users`, {
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
    }

    if (api_name === "createChannel") {
        try {

            const body = {
                name: message_body,
                user_ids: receiver_id
            }
            // console.log(body)
            // const authHeader = JSON.parse(localStorage.getItem("authHeader"));
            const data = await fetch(`${url}/api/v1/channels`, {
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


            // to update userChannel in LS
            if (res && res.data != undefined) {
                const userChannelLS = JSON.parse(localStorage.getItem("userChannels"));
                const newChannel = {
                    created_at: "",
                    id: res.data.id,
                    name: message_body,
                    owner_id: currentUser.id,
                    updated_at: ""
                }
                userChannelLS.push(newChannel)
                localStorage.setItem("userChannels", JSON.stringify(userChannelLS));
            }

            // end update

            // console.log('res')
            // console.log(res.data)


            return res;
        } catch (error) {
            console.log(error);
        }
    }

    if (api_name === "channelMembers") {
        try {

            const data = await fetch(`${url}/api/v1/channels/${channel_id}`, {
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


            // to update userChannel in LS
            if (res && res.data != undefined) {
                // const userChannelLS = JSON.parse(localStorage.getItem("userChannels"));
                // const newChannel = {
                //     created_at: "",
                //     id: res.data.id,
                //     name: message_body,
                //     owner_id: currentUser.id,
                //     updated_at: ""
                // }
                // userChannelLS.push(newChannel)
                localStorage.setItem("channelMembers", JSON.stringify(res.data.channel_members));
                const channelMembers = res.data.channel_members;

                const membersEmail = [];
                channelMembers.map((m, i) => {
                    usersList.find((u) => {
                        if (u.id === m.user_id) {
                            // console.log(u.email)
                            membersEmail.push(u.email)
                        }
                    })
                })

                localStorage.setItem("displayMembersEmail", JSON.stringify(membersEmail));
            }

            // end update

            // console.log('res')
            // console.log(res.data)


            return res;
        } catch (error) {
            console.log(error);
        }
    }

    if (api_name === "addMember") {
        console.log("test")
        try {

            const body = {
                id: channel_id,
                member_id: receiver_id

            }
            const data = await fetch(`${url}/api/v1/channel/add_member`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers
            })

            const res = await data.json();

            alert("successfuly added")
            return res;
        } catch (error) {
            // console.log(error);
            alert(error)
        }
    }

}

export default api