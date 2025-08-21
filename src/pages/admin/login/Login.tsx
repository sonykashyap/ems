import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
})

const AdminLogin = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
        username: "",
        email: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <section className='admin-login'>
                <div className=" h-screen flex items-center justify-center">
                    <div className="w-sm py-8 md:w-md md:mx-auto mx-8 shadow bg-dark-400 px-4">
                        <div className='title text-center font-bold'>
                            <h1 className='text-xl'>Login</h1>
                        </div>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className='relative group'>
                                            <FormLabel>Username</FormLabel>
                                            <div className='relative group'>
                                                <FormControl >
                                                    <Input placeholder="john" {...field} className='border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0' />
                                                </FormControl>
                                                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-gray-500 border-gray-300 transition-transform duration-300 ease-in-out group-focus-within:scale-x-100"></span>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                        
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>Email</FormLabel>
                                            <div className='relative group'>
                                                <FormControl>
                                                    <Input placeholder="abc@example.com" {...field} className='border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0' />
                                                </FormControl>
                                                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-gray-500 border-gray-300 transition-transform duration-300 ease-in-out group-focus-within:scale-x-100"></span>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex items-center justify-between'>
                                    <Button type="submit">Submit</Button>
                                    <Link className='text-sm' to="/">Forgot Password</Link>
                                </div>
                                
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLogin