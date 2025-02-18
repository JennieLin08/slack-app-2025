"use client"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
// import userMessages from '@/helpers/userMessages';
import { stateLs } from '@/helpers/stateLS';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input';
import { UserPen } from 'lucide-react';
import sendMessage from '@/helpers/sendMessage';
import bg from '@/assets/bg.jpg'
import api from '@/helpers/api';
import "./loader.css"
import "./chat_style.css"

// dialog/modal
// import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import isLogin from '@/helpers/isLogin';
import Select from 'react-select'


const Channel = () => {
    // isLogin()
    const id = useParams();
    // userMessages(id.id);

    api("channelMessages", id.id, 0, "");
    api("channelMembers", 0, id.id, "");

    const userChannels = JSON.parse(localStorage.getItem("userChannels"));
    const channel_details = userChannels.filter((c) => c.id == id.id)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    const [chats, getChats] = useState([]);
    const [loader, setLoader] = useState("loader");
    const [channelMembers, setChannelMems] = stateLs("channelMembers", []);
    const [displayMembersEmail, setDisplayMembersEmail] = useState([]);

    useEffect(() => {
        setLoader('loader')
        loadChatBox();
    }, [id])

    function loadChatBox() {
        setTimeout(() => {
            getChats(JSON.parse(localStorage.getItem("channelMessages")));

            setChannelMems(JSON.parse(localStorage.getItem("channelMembers")))
            setDisplayMembersEmail(JSON.parse(localStorage.getItem("displayMembersEmail")))

            setLoader('')
            // console.log(membersEmail)
            // console.log(loader)
        }, 3000)
    }


    async function handleMessageBox(e) {
        e.preventDefault();
        if (e.key === "Enter") {
            // console.log(e.target.value)
            const message_body = e.target.value;
            const receiver_id = id.id;
            sendMessage(receiver_id, message_body, "Channel");
            // window.location.reload();
            e.target.value = "";
            // userMessages(id.id);
            api("channelMessages", id.id, 0, "")
            loadChatBox()
            console.log('chatbox', chats);
            // loadChatBox()
        }
    }





    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const users = JSON.parse(localStorage.getItem("usersList"));
    const options = [];

    const userOptions = users.map((u) => {
        let option = { value: u.id, label: u.uid }
        options.push(option)
        // console.log(option)
    })

    useEffect(() => {
        if (selectedOption) {
            // console.log(selectedOption)
            api("addMember", selectedOption.value, id.id, "")
            setDisplayMembersEmail([...displayMembersEmail, selectedOption.label])
        }

    }, [selectedOption])


    return (
        <>

            <div className='flex flex-row'>
                <div className='flex my-2'>
                    <UserPen /><span className='mx-2'>{channel_details[0].name}</span>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" id={channel_details[0].id}>Members List</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>

                                <DialogTitle>{channel_details[0].name}</DialogTitle>
                                <DialogDescription>

                                    <div className='m-2 p-2'>
                                        <Select options={options} className="pl-8 text-black" onChange={setSelectedOption} defaultValue={selectedOption} />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <h6>     Members</h6>
                            <div className="flex items-center space-x-2">


                                <ul>
                                    {
                                        displayMembersEmail.map((e, i) => {
                                            return (
                                                <li key={i}>{i + 1}. {e}</li>
                                            )
                                        })
                                    }

                                </ul>

                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>

            <ScrollArea className="h-[70vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-5" style={{
                backgroundImage: `url(${bg})`
            }} >
                <div className='flex flex-col min-h-full bg-fixed '  >

                    <div className={loader}>

                    </div>

                    {
                        chats.map((chat) => {
                            //  chat.created_at;
                            const newDate = Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZone: "Asia/Manila",
                            }).format(new Date(chat.created_at));
                            let card_alignment = "";
                            let email_alignment = "";
                            if (chat.sender.id == currentUser.id) {
                                card_alignment = "flex flex-row-reverse";
                                email_alignment = "float-right p-1";
                            } else {
                                card_alignment = "flex flex-row";
                                email_alignment = "float-start p-1";
                            }
                            return (
                                <div className={card_alignment} key={chat.id}>
                                    <Card className="flex flex-col max-w-2xl my-1" id="div_box">
                                        {/* <CardHeader> */}
                                        <div>
                                            <CardDescription className={email_alignment}>{chat.sender.email}</CardDescription>
                                        </div>

                                        {/* </CardHeader> */}
                                        <CardContent>
                                            <p>{chat.body}</p>
                                        </CardContent>
                                        <CardFooter>
                                            {/* <CardDescription>{chat.created_at}</CardDescription> */}
                                            <CardDescription>{newDate}</CardDescription>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )

                        })
                    }


                </div>
            </ScrollArea>
            <div className='m-2 flex'>
                <Input id="message_box" name="message_box" className="h-20 border-l-amber-200 border-gray-300" placeholder="Type your message ...." type="text" onKeyUp={handleMessageBox} />
            </div>

        </>
    )
}

export default Channel