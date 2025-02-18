import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { stateLs } from '@/helpers/stateLS';

// use for chat box
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input';
import { UserPen } from 'lucide-react';
import sendMessage from '@/helpers/sendMessage';
import bg from '@/assets/bg.jpg'
import api from '@/helpers/api';
import "./loader.css"
import "./chat_style.css"
import isLogin from '@/helpers/isLogin';

const Chat = () => {
    isLogin()
    const id = useParams();
    // userMessages(id.id);

    api("userMessages", id.id, 0, "")
    const users = JSON.parse(localStorage.getItem("usersList"));
    const receiver_details = users.filter((u) => u.id == id.id)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [chats, getChats] = useState([]);
    const [loader, setLoader] = useState("loader");

    useEffect(() => {
        setLoader('loader')
        loadChatBox();
    }, [id])

    function loadChatBox() {
        setTimeout(() => {
            getChats(JSON.parse(localStorage.getItem("userMessages")));
            setLoader('')
            console.log(loader)
        }, 3000)
    }



    async function handleMessageBox(e) {
        e.preventDefault();
        if (e.key === "Enter") {
            // console.log(e.target.value)
            const message_body = e.target.value;
            const receiver_id = id.id;
            sendMessage(receiver_id, message_body, "User");
            // window.location.reload();
            e.target.value = "";
            // userMessages(id.id);
            api("userMessages", id.id, 0, "")
            loadChatBox()
            // loadChatBox()
        }
    }


    return (
        <>


            <div className='flex my-2'>
                <UserPen /><span className='mx-2'>{receiver_details[0].email}</span>
            </div>
            <ScrollArea className="h-[70vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-5" style={{
                backgroundImage: `url(${bg})`
            }} >
                <div className='flex flex-col min-h-full bg-fixed '  >

                    <div className={loader}>

                    </div>

                    {
                        chats.map((chat) => {

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
                                        {/* <div>
                                            <CardDescription className={email_alignment}>{chat.sender.email}</CardDescription>
                                        </div> */}

                                        {/* </CardHeader> */}
                                        <CardContent>
                                            <p>{chat.body}</p>
                                        </CardContent>
                                        {/* <CardFooter> */}
                                        <div className='p-2'>
                                            <CardDescription>{newDate}</CardDescription>
                                        </div>

                                        {/* </CardFooter> */}
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

export default Chat