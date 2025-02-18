
"use client"
import React from 'react'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from 'react-router'
import { AppSidebar } from './app-sidebar'
import { Trash2 } from 'lucide-react';
import api from '@/helpers/api'


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,

} from "@/components/ui/sidebar"

// for dialog/modal
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


// for combobox/select


// import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useState } from 'react'
import isLogin from '@/helpers/isLogin'



const UserLayout = () => {
    isLogin();
    const users = JSON.parse(localStorage.getItem("usersList"));

    // create member options in select tag
    const [membersOptions, setMembersOptions] = useState(
        users.map((u) => {
            const newOption = { value: u.id, label: u.uid }
            return newOption;
        }
        ));

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [selectedMembers, setSelectedMembers] = useState([]);

    function handleOnselectMember(currentValue) {

        // console.log(currentValue)

        // push new member to selected members array
        membersOptions.find((mem) => {
            if (mem.label === currentValue) {
                setSelectedMembers([...selectedMembers, mem])
            }
        })

        // remove selected value from members options
        const newMemOptions = membersOptions.filter((option) => option.label != currentValue)
        setMembersOptions(newMemOptions)

        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)
    }

    function handleRemoveMember(e) {
        e.preventDefault();
        const newArrMems = selectedMembers.filter((mem) => mem.value != e.currentTarget.id)
        setSelectedMembers(newArrMems)
    }

    async function handleNewChannelForm(e) {
        e.preventDefault();
        // console.log(e)
        // console.log(e.target.channelName.value)
        const channelName = e.target.channelName.value;
        const membersIdsArr = selectedMembers.map((s) => {
            return s.value;
        })
        // console.log(membersIdsArr)
        const channelCreated = await api("createChannel", membersIdsArr, 0, channelName)

        setTimeout(() => {
            // if(channelCreated.errors[0])
            if (channelCreated && channelCreated.errors != undefined) {
                alert(channelCreated.errors[0])
            }
            if (channelCreated && channelCreated.data != undefined) {
                alert("success")
            }
            window.location.reload()
        }, 3000)

    }


    return (

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">





                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Create New Channel</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <form className="p-6 md:p-8" onSubmit={handleNewChannelForm} >
                                                <DialogHeader>
                                                    <DialogTitle>New Channel</DialogTitle>
                                                    <DialogDescription>
                                                        Click create when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">

                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input type="text" name="channelName" className="form-control w-[200px] " placeholder="input channel name" />

                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="username" className="text-right">
                                                            Members
                                                        </Label>


                                                        {/* start select members  */}
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={open}
                                                                    className="w-[200px] justify-between"
                                                                >
                                                                    {value
                                                                        ? membersOptions.find((membersOption) => membersOption.value === value)?.label
                                                                        : "Select framework..."}
                                                                    <ChevronsUpDown className="opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search framework..." className="h-9" />
                                                                    <CommandList>
                                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {membersOptions.map((membersOption) => (
                                                                                <CommandItem
                                                                                    key={membersOption.value}
                                                                                    value={membersOption.value}
                                                                                    onSelect={handleOnselectMember}
                                                                                >
                                                                                    {membersOption.label}
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "ml-auto",
                                                                                            value === membersOption.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        {/* end select members  */}


                                                    </div>
                                                </div>

                                                <div className="">
                                                    <ul >
                                                        {selectedMembers.map((m) => {
                                                            return (
                                                                <li key={m.value} className='flex flex-row my-2'><button type="button" id={m.value} onClick={(e) => handleRemoveMember(e)}> <Trash2 className="text-red-700" /></button>{m.label}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Create</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>

                                    </Dialog>





                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem> */}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div> */}
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-5" >

                        <Outlet />

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >

        // <SidebarProvider>
        //     <SidebarApp />
        //     <main>
        //         <SidebarTrigger />
        //         <Outlet />
        //     </main>
        // </SidebarProvider>
    )
}

export default UserLayout