import React, { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useNavigate } from 'react-router';
import axiosInstance from '@/axios/axiosInstance';
import {toast} from 'sonner';

type FormState = {
  email: string;
  error?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
  passwordError?: string | undefined;
  errorName?: string | undefined;

};


const Signup = () =>{
    const navigate = useNavigate();
    const [state, submitForm, isPending] = useActionState<FormState, FormData>(
    submitEmail,
    { email: '', error: undefined, password : '', name: '', passwordError: undefined, errorName: undefined }
  );

  async function submitEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email.includes('@')) {
    return { ...prevState, error: 'Invalid email address' };
  }
  if (!password || password.length < 8) {

    return { ...prevState, passwordError: 'Password less than 8 characters' };
  }

   if (!name) {

    return { ...prevState, errorName: 'Please enter your name' };
  }

  try{
    const response = await axiosInstance.post("/signup",{email, password, name});
    if(response.status === 201){
      // navigate("/")
       toast(`${response.data.message}`, {
        classNames: {
          toast: "!bg-green-200",
          title: "!text-green-600 font-bold",
        },
      });
      console.log("Response is", response);
    }
    return { email, error: undefined, password, name };
  }catch(error: any){
    if(error.response?.status == 409){
      toast(`${error.response.data.message}`, {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        },
      });
    }
  }
}

  return(
      <>
        <div className='container mx-auto h-screen flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <form action={submitForm}>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    
                    <CardAction>
                        {/* <Button type="button" variant="link" >Login</Button> */}
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                          {/* <Label htmlFor="email">Email</Label> */}
                          <Input
                            id="email"
                            type="text"
                            name='email'
                            placeholder="Email"
                            className='rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-color-none'
                          
                          />
                          {state.error && <p className='text-red-400 bg-red-100'> {state.error} </p>}
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                              {/* <Label htmlFor="password">Password</Label> */}
                          </div>
                          <Input 
                            id="password" 
                            type="password" 
                            name='password' 
                            placeholder='Password'
                            className='rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-color-none'  
                          />
                          {state.passwordError && <p className='text-sm text-red-400 bg-red-100'> {state.passwordError} </p>}
                        </div>
                        <div className="grid gap-2">
                          <Input
                            id="name"
                            type="text"
                            name='name'
                            placeholder="Your name"
                            className='rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-color-none'
                          
                          />
                          {state.errorName && <p className='text-red-400 bg-red-100'> {state.errorName} </p>}
                        </div>
                    </div>
                    
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing In..." : "Signup"}
                    </Button>
                    <Button
                      onClick={()=> navigate('/login')}
                      variant="outline"
                      className='w-full text-purple-400'>
                      Login
                    </Button>
                </CardFooter>
                </form>
            </Card>
        </div>          
      </>
  )
}

export default Signup;