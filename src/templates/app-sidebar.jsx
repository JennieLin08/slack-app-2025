import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

// import { SearchForm } from "@/components/search-form"
import { SearchForm } from "./search-form"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router"
import api from "@/helpers/api"
import { stateLs } from "@/helpers/stateLS"
import { useState } from "react"
import logo from "@/assets/component.svg"



// This is sample data.


export function AppSidebar({ ...props }) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let usersList = JSON.parse(localStorage.getItem("usersList"));

    usersList = usersList.map((u) => {
        const newUser = {
            title: u.uid,
            url: `/pages/user/chat/${u.id}`,
        }
        return newUser;
    });



    const [channels, setChannels] = stateLs("userChannels", []);
    const [userChannels, setUserChannels] = useState(channels.map((c) => {
        // if (c.owner_id === currentUser.id) {
        const newChannel = {
            title: c.name,
            url: `/pages/user/channel/${c.id}`,
        }
        return newChannel;
        // }
    }));





    // console.log(channels)

    function handleLogout() {
        localStorage.removeItem("authHeader");
        navigate("/login");
    }

    // console.log(channels[0].owner_id);

    // console.log(userChannels)
    const data = {
        navMain: [
            {
                title: "Channel",
                url: "#",
                items: userChannels,
            },
            {
                title: "DM's",
                url: "#",
                items: usersList,
            },
        ],
    }

    // console.log(data);


    return (
        <>
            <Sidebar {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-yellow-100 text-sidebar-primary-foreground">
                                        {/* <GalleryVerticalEnd className="size-4" /> */}
                                        <img src={logo} className="size-4" alt="" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">Connect + </span>
                                        <span className="">{currentUser.email}</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <SearchForm />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>

                            {data.navMain.map((item, index) => (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={index === 1}
                                    className="group/collapsible"
                                >

                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {item.title}{" "}
                                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {item.items?.length ? (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((item) => (
                                                        <SidebarMenuSubItem key={item.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={item.isActive}
                                                            >
                                                                <a href={item.url}>{item.title}</a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        ) : null}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}

                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className=' '>
                    <div>
                        <button onClick={handleLogout} className='flex hover:text-black hover:bg-white m-2 p-2 rounded-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                            <span>Logout</span>
                        </button>
                    </div>
                    <div>
                        CONNECT+
                    </div>
                </SidebarFooter>

                <SidebarRail />


            </Sidebar>

        </>)
}
