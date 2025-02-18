import { Search } from "lucide-react"
import { useState } from "react";

import { useEffect } from "react";

import { Label } from "@/components/ui/label"
import api from "@/helpers/api";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import React from 'react'
import Select from 'react-select'
import { useNavigate } from "react-router";


export function SearchForm({ ...props }) {
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

            api("userMessages", selectedOption.value, 0, "")

            navigate(`/pages/user/chat/${selectedOption.value}`)
        }

    }, [selectedOption])

    // console.log(selectedOption)

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">

                    <Select options={options} className="pl-8 text-black" onChange={setSelectedOption} defaultValue={selectedOption} />

                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
