import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

import bg_image from '@/assets/component.svg'
import { Plus } from 'lucide-react';
import { Label } from "@/components/ui/label"


const Registration = () => {
    const navigate = useNavigate();
    async function handleRegistrationForm(e) {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let password_confirmation = e.target.password_confirmation.value;
        // console.log(e.target.email.value);
        // console.log(e.target.password.value);

        console.log(email, password, password_confirmation);

        const response = await register(email, password, password_confirmation);

        // console.log(response);
        if (response.data) {
            navigate("/login")
        } else {
            // console.log(response.errors[0])

            alert(response.errors ? response.errors[0] : '')
        }


    }


    async function register(email, password, password_confirmation) {
        try {
            const body = {
                email,
                password,
                password_confirmation
            }

            const data = await fetch(`https://slack-api.replit.app/api/v1/auth/?email=${email}&password=${password}&password_confirmation=${password_confirmation}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // console.log(data.headers)
            const authHeader = {
                accessToken: data.headers.get("access-token"),
                client: data.headers.get("client"),
                expiry: data.headers.get("expiry"),
                uid: data.headers.get("uid"),
            }

            localStorage.setItem("authHeader", JSON.stringify(authHeader))
            const res = await data.json();

            return res;
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            {/* <div className='flex flex-col h-screen  justify-center'>
                <form action="" onSubmit={handleRegistrationForm} className='w-80 self-center '>
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>Connect with friends, free 4ever!</CardDescription>
                        </CardHeader>
                        <CardContent>
                          
                            <Input type="email" name="email" placeholder="mail@mail.com" className="my-2" />
                            <Input type="password" name="password" placeholder="*******" className="my-2" />
                            <Input type="password" name="password_confirmation" placeholder="*******" className="my-2" />

                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <div>
                                <Button type="submit" > Register</Button>
                            </div>
                            <div>
                                <h6> Already have an account? <a href="/login" className='text-blue-500'>Login</a></h6>
                            </div>



                        </CardFooter>
                    </Card>
                </form>
            </div> */}










            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">






                    <div>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <div className="relative hidden bg-muted md:block bg-yellow-100">
                                    <img
                                        src={bg_image}
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                                <div className='p-5'>
                                    <form action="" onSubmit={handleRegistrationForm} className='w-80 self-center '>
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col items-center text-center">
                                                <h1 className="text-2xl font-bold">Register</h1>
                                                <p className="text-balance text-muted-foreground">
                                                    <span className='flex'>Connect with friends, free 4ever!</span>
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                {/* <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="m@example.com"
                                                    required
                                                /> */}

                                                <Input type="email" name="email" placeholder="mail@mail.com" className="my-2" />
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>

                                                </div>
                                                {/* <Input id="password" name="password" type="password" required /> */}
                                                <Input type="password" name="password" placeholder="*******" className="my-2" />
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Confirm Password</Label>

                                                </div>
                                                {/* <Input id="password" name="password" type="password" required /> */}
                                                <Input type="password" name="password_confirmation" placeholder="*******" className="my-2" />
                                            </div>
                                            <Button type="submit" className="w-full">
                                                Submit
                                            </Button>
                                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                                    Connect+
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">

                                            </div>
                                            <div className="text-center text-sm">
                                                Already have an account?{" "}
                                                <a href="/login" className="underline underline-offset-4">
                                                    login
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </CardContent>
                        </Card>
                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>






                </div>
            </div>

        </>
    )
}

export default Registration

