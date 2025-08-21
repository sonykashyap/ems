import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useNavigate } from 'react-router';
// import axios from 'axios';
import axiosInstance from "@/axios/axiosInstance";
import { error } from 'console';

// type UserProps = {
//   email: string;
// };

type FormState = {
  email: string;
  error?: string;
  password?: string
};



const Login = () =>{
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [state, submitForm, isPending] = useActionState<FormState, FormData>(
    submitEmail,
    { email: '', error: undefined, password : '' }
  );
  
  async function submitEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email.includes('@')) {
    return { ...prevState, error: 'Invalid email address' };
  }
  if (!password || password.length < 8) {

    return { ...prevState, error: 'Password less than 8 characters' };
  }

  // Simulate API request
  try{
    const response = await axiosInstance.post("/login", {email: email, password: password});
    if(response.status == 200){
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }else{
      alert("User did not find");
    }
    
    // await new Promise((resolve) => setTimeout(resolve, 1000));
  }catch(error : any){
    console.log(error);
    alert(error.response.data.message);
  }
  return { email, error: undefined, password };
}


    return(
        <>
          <div className='container mx-auto h-screen flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <form action={submitForm}>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardAction>
                    <Button variant="link" onClick={()=> navigate('/signup')}>Sign Up</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          name='email'
                          placeholder="abc@example.com"
                        
                        />
                      </div>
                      <div className="grid gap-2">
                      <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                          Forgot your password?
                          </a>
                      </div>
                      <div className='relative'>
                        <Input id="password" type={showPassword ? 'text' : 'password'} name='password' />
                        <span className='text-xs absolute top-2 right-2 hover:cursor-pointer' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                      </div>
                      
                      
                      {/* {state.error && <p> {state.error} </p>} */}
                      </div>
                  </div>
                  {/* {state.email && <p> {state.email} </p>} */}
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Logging In..." : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Login with Google
                    </Button>
                    
                </CardFooter>
                </form>
            </Card>
          </div>
        </>
    )
}

export default Login;