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



import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react';
import api from '@/helpers/api'


const Login = () => {
    const navigate = useNavigate();
    async function handleLoginForm(e) {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        const response = await signIn(email, password);

        // console.log(response);
        if (response && response.data != undefined) {

            api("usersList", 0, 0, "");
            api("userChannels", 0, 0, "");
            setTimeout(() => {
                navigate("/pages/user/")
                window.location.reload()
            }, 3000)

        } else {
            // console.log(response.errors[0])
            alert(response.errors ? response.errors[0] : '')
        }

    }

    async function signIn(email, password) {
        try {
            const body = {
                email,
                password,
            }

            const data = await fetch(`https://slack-api.replit.app/api/v1/auth/sign_in`, {
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
            if (res && res.data != undefined) {
                const currentUser = {
                    id: res.data.id,
                    email: res.data.email
                }
                localStorage.setItem("currentUser", JSON.stringify(currentUser))
            }


            // console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">






                <div>
                    <Card className="overflow-hidden">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8" onSubmit={handleLoginForm} >
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Welcome back</h1>
                                        <p className="text-balance text-muted-foreground">
                                            <span className='flex'>Login to your Connect<Plus /> account</span>
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>

                                        </div>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                            Connect+
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">

                                    </div>
                                    <div className="text-center text-sm">
                                        Don&apos;t have an account?{" "}
                                        <a href="/register" className="underline underline-offset-4">
                                            Sign up
                                        </a>
                                    </div>
                                </div>
                            </form>
                            <div className="relative hidden bg-muted md:block bg-yellow-100">
                                <img
                                    src={bg_image}
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
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

    )
}

export default Login

